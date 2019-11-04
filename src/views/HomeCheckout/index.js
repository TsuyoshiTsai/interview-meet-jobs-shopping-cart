import React, { Fragment } from 'react'
import { useRouteMatch, useHistory, Redirect } from 'react-router-dom'
import { Formik, Form, Field, ErrorMessage } from 'formik'

import OrderProduct from 'components/OrderProduct'

import * as CartApi from 'lib/api/cart'
import * as OrderApi from 'lib/api/order'
import * as PaymentApi from 'lib/api/payment'
import * as ProductApi from 'lib/api/product'
import * as ShippingApi from 'lib/api/shipping'
import withFetching from 'lib/hocs/withFetching'
import useFetcher from 'lib/effects/useFetcher'
import useCart from 'lib/effects/useCart'
import * as formatter from 'lib/utils/formatter'
import * as parser from 'lib/utils/parser'

import validationSchema from './validationSchema'

const FragmentWithFetching = withFetching(Fragment)
const StyledErrorMessage = props => <ErrorMessage {...props} render={message => <span style={{ fontSize: 12, color: 'red' }}>{message}</span>} />

function HomeCheckout () {
  const match = useRouteMatch()
  const history = useHistory()
  const [cart, updateCart] = useCart()
  const [paymentResoponse, paymentStatus] = useFetcher({ fetcher: PaymentApi.fetchPayments })
  const [shippingResponse, shippingStatus] = useFetcher({ fetcher: ShippingApi.fetchShippings })

  const replacedUrl = match.url.replace('checkout', '')

  const initialValues = {
    amount: cart.amount,
    payment: null,
    orderProducts: cart.orderProducts,
    shipping: null,
    receiver: {
      name: '',
      phone: '',
      address: '',
    },
    remark: '',
  }

  const onSubmit = async (values, actions) => {
    try {
      const { data: latestCart } = await CartApi.fetchCart()

      const differenceOrderProducts = latestCart.getDifferenceOrderProducts(cart.orderProducts)
      if (differenceOrderProducts.length > 0) {
        throw new Error(`您購買的以下商品已經不在購物車內:\n${differenceOrderProducts.map(product => product.name).join('\n')}`)
      }

      const invalidQuantityOrderProducts = latestCart.getInvalidQuantityOrderProducts(cart.orderProducts)
      if (invalidQuantityOrderProducts.length > 0) {
        throw new Error(`您購買的以下商品數量超過您所選擇的數量:\n${invalidQuantityOrderProducts.map(product => product.name).join('\n')}`)
      }

      const outOfInventoryOrderProducts = latestCart.getOutOfInventoryOrderProducts()
      if (outOfInventoryOrderProducts.length > 0) {
        throw new Error(`您購買的以下商品數量超過庫存量:\n${outOfInventoryOrderProducts.map(product => product.name).join('\n')}`)
      }

      await OrderApi.createOrder(values)
      await Promise.all([
        ...cart.orderProducts.map(orderProduct => CartApi.removeOrderProduct({ id: orderProduct.id })),
        ...cart.orderProducts.map(orderProduct =>
          ProductApi.updateInventory({ id: orderProduct.productId, inventory: orderProduct.calculateNextInventory() })
        ),
      ])

      updateCart()
      history.push(`${match.url}/success`)
    } catch (error) {
      console.error(error)
      alert(error.message)
      updateCart()
      history.push(`${replacedUrl}cart`)
    }
  }

  return cart.orderProducts.length > 0 ? (
    <div style={{ padding: 20 }}>
      <div>訂單商品</div>

      <OrderProduct.List>
        {cart.orderProducts.map((orderProduct, index) => (
          <OrderProduct.Item
            key={index}
            toPath={`${replacedUrl}product/${orderProduct.productId}`}
            orderProduct={orderProduct}
            isEditable={false}
            isRemovable={false}
          />
        ))}
      </OrderProduct.List>

      <h2>
        購買總金額 <span style={{ color: 'red' }}>${formatter.amount(cart.amount)}</span>
      </h2>

      <hr />

      <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
        {({ setFieldValue, isValid, isSubmitting }) => {
          return (
            <Form>
              <div>寄送資訊</div>
              <div>
                <div>選擇寄送方式</div>
                <Field name='shipping'>
                  {({ field }) => (
                    <FragmentWithFetching
                      {...shippingStatus}
                      render={() =>
                        shippingResponse.data.map((shipping, index) => (
                          <div key={index}>
                            <label htmlFor={`shipping-${shipping.id}`}>{shipping.name}</label>
                            <input
                              id={`shipping-${shipping.id}`}
                              type='radio'
                              value={shipping.id}
                              checked={shipping.id === field.value}
                              onChange={event => setFieldValue(field.name, shipping.id)}
                            />
                          </div>
                        ))}
                    />
                  )}
                </Field>
                <StyledErrorMessage name='shipping' />

                <Field name='receiver.name'>
                  {({ field }) => (
                    <div>
                      <label htmlFor={field.name}>姓名</label>
                      <input {...field} id={field.name} maxLength='10' type='text' />
                      <StyledErrorMessage name='receiver.name' />
                    </div>
                  )}
                </Field>

                <Field name='receiver.phone'>
                  {({ field }) => (
                    <div>
                      <label htmlFor={field.name}>手機號碼</label>
                      <input
                        {...field}
                        id={field.name}
                        maxLength='10'
                        type='text'
                        onChange={event => setFieldValue(field.name, parser.number(event.target.value))}
                      />
                      <StyledErrorMessage name='receiver.phone' />
                    </div>
                  )}
                </Field>

                <Field name='receiver.address'>
                  {({ field }) => (
                    <div>
                      <label htmlFor={field.name}>地址</label>
                      <input {...field} id={field.name} type='text' />
                      <StyledErrorMessage name='receiver.address' />
                    </div>
                  )}
                </Field>
              </div>

              <hr />

              <div>選擇付款方式</div>
              <div>
                <Field name='payment'>
                  {({ field }) => (
                    <FragmentWithFetching
                      {...paymentStatus}
                      render={() =>
                        paymentResoponse.data.map((payment, index) => (
                          <div key={index}>
                            <label htmlFor={`payment-${payment.id}`}>{payment.name}</label>
                            <input
                              id={`payment-${payment.id}`}
                              type='radio'
                              value={payment.id}
                              checked={payment.id === field.value}
                              onChange={event => setFieldValue(field.name, payment.id)}
                            />
                          </div>
                        ))}
                    />
                  )}
                </Field>
                <StyledErrorMessage name='payment' />
              </div>

              <hr />

              <Field name='remark'>
                {({ field }) => (
                  <div>
                    <label htmlFor={field.name}>備註</label>
                    <input {...field} id={field.name} type='text' />
                  </div>
                )}
              </Field>

              <button type='submit' disabled={isSubmitting || !isValid}>
                下訂單
              </button>
            </Form>
          )
        }}
      </Formik>
    </div>
  ) : (
    <Redirect to={`${replacedUrl}cart`} />
  )
}

export default HomeCheckout
