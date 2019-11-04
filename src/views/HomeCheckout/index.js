import React, { Fragment } from 'react'
import { useRouteMatch, useHistory, Redirect } from 'react-router-dom'
import { Formik, Form, Field } from 'formik'

import Product from 'components/Product'

import * as CartApi from 'lib/api/cart'
import * as OrderApi from 'lib/api/order'
import * as PaymentApi from 'lib/api/payment'
import * as ProductApi from 'lib/api/product'
import * as ShippingApi from 'lib/api/shipping'
import withFetching from 'lib/hocs/withFetching'
import useFetcher from 'lib/effects/useFetcher'
import useCart from 'lib/effects/useCart'

const FragmentWithFetching = withFetching(Fragment)

function HomeCheckout () {
  const match = useRouteMatch()
  const history = useHistory()
  const [cart, updateCart] = useCart()
  const [paymentResoponse, paymentStatus] = useFetcher({ fetcher: PaymentApi.fetchPayments })
  const [shippingResponse, shippingStatus] = useFetcher({ fetcher: ShippingApi.fetchShippings })

  const replacedUrl = match.url.replace('checkout', '')

  const initialValues = {
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
        throw new Error(`您購買的以下商品數量超過庫存量:\n${invalidQuantityOrderProducts.map(product => product.name).join('\n')}`)
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
      updateCart()
      alert(error)
      history.push(`${replacedUrl}cart`)
    }
  }

  return cart.orderProducts.length > 0 ? (
    <>
      <div>訂單商品</div>

      <Product.List>
        {cart.orderProducts.map((orderProduct, index) => (
          <Product.Item key={index} toPath={`${replacedUrl}product/${orderProduct.productId}`} product={orderProduct} />
        ))}
      </Product.List>

      <div>小計：{cart.amount}</div>

      <hr />

      <Formik initialValues={initialValues} onSubmit={onSubmit}>
        {({ setFieldValue }) => {
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

                <Field name='receiver.name'>
                  {({ field }) => (
                    <div>
                      <label htmlFor={field.name}>姓名</label>
                      <input {...field} id={field.name} type='text' />
                    </div>
                  )}
                </Field>

                <Field name='receiver.phone'>
                  {({ field }) => (
                    <div>
                      <label htmlFor={field.name}>手機號碼</label>
                      <input {...field} id={field.name} type='text' />
                    </div>
                  )}
                </Field>

                <Field name='receiver.address'>
                  {({ field }) => (
                    <div>
                      <label htmlFor={field.name}>地址</label>
                      <input {...field} id={field.name} type='text' />
                    </div>
                  )}
                </Field>
              </div>

              <hr />

              <div>付款方式</div>
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

              <button type='submit'>下訂單</button>
            </Form>
          )
        }}
      </Formik>
    </>
  ) : (
    <Redirect to={`${replacedUrl}cart`} />
  )
}

export default HomeCheckout
