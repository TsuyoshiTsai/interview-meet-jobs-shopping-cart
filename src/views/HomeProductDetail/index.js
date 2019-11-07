import React, { Fragment } from 'react'
import { useParams } from 'react-router-dom'
import { Formik, Form, Field } from 'formik'

import * as ProductApi from 'lib/api/product'
import * as CartApi from 'lib/api/cart'
import withFetching from 'lib/hocs/withFetching'
import useFetcher from 'lib/effects/useFetcher'
import useCart from 'lib/effects/useCart'
import * as formatter from 'lib/utils/formatter'

const FragmentWithFetching = withFetching(Fragment)

function HomeProductDetail () {
  const params = useParams()
  const [, updateCart] = useCart()
  const [productResponse, status] = useFetcher({ fetcher: ProductApi.fetchProductDetail, initialParameters: { id: params.id } })

  const initialValues = { product: productResponse.data, quantity: 1 }

  const onSubmit = async (values, actions) => {
    const { product, quantity } = values

    try {
      const { data: latestCart } = await CartApi.fetchCart()

      if (latestCart.hasProduct(product.id)) {
        const orderProduct = latestCart.findByProductId(product.id)
        const newQuantity = orderProduct.quantity + quantity

        if (newQuantity > orderProduct.inventory) {
          throw new Error('您購買的商品數量超過庫存量')
        }

        await CartApi.updateOrderProductQuantity({ id: orderProduct.id, quantity: newQuantity })
      } else {
        await CartApi.addOrderProduct({ product, quantity })
      }

      updateCart()
    } catch (error) {
      console.error(error)
      alert(error.message)
      updateCart()
    }
  }

  return (
    <Formik enableReinitialize initialValues={initialValues} onSubmit={onSubmit}>
      {({ values, isSubmitting }) => {
        return (
          <Form style={{ margin: 20, padding: 20 }}>
            <FragmentWithFetching
              {...status}
              render={() => (
                <div>
                  <div>{values.product.name}</div>

                  <br />

                  <div>
                    庫存: {values.product.inventory} {values.product.unit}
                  </div>

                  <br />

                  <div>價錢: ${formatter.amount(values.product.price)}</div>

                  <br />

                  <div>
                    數量: <Field name='quantity' type='number' min='1' max={values.product.inventory} />
                  </div>

                  <br />

                  <button type='submit' disabled={isSubmitting}>
                    加入購物車
                  </button>

                  <hr />

                  <div>{values.product.description}</div>
                </div>
              )}
            />
          </Form>
        )
      }}
    </Formik>
  )
}

export default HomeProductDetail
