import React, { Fragment } from 'react'
import { useParams } from 'react-router-dom'
import { Formik, Form, Field } from 'formik'

import * as ProductApi from 'lib/api/product'
import * as CartApi from 'lib/api/cart'
import withFetching from 'lib/hocs/withFetching'
import useFetcher from 'lib/effects/useFetcher'
import useCart from 'lib/effects/useCart'
import { amount } from 'lib/utils/formatter'

const FragmentWithFetching = withFetching(Fragment)

function HomeProductDetail () {
  const params = useParams()
  const [cart, updateCart] = useCart()
  const [productResponse, status] = useFetcher({ fetcher: ProductApi.fetchProductDetail, initialParameters: { id: params.id } })

  const initialValues = { product: productResponse.data, quantity: 1 }

  const onSubmit = async (values, actions) => {
    const { product, quantity } = values

    try {
      if (cart.hasProduct(product.id)) {
        const orderProduct = cart.findByProductId(product.id)

        await CartApi.updateOrderProductQuantity({ id: orderProduct.id, quantity: orderProduct.quantity + quantity })
      } else {
        await CartApi.addOrderProduct({ product, quantity })
      }

      updateCart()
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <Formik enableReinitialize initialValues={initialValues} onSubmit={onSubmit}>
      {({ values }) => {
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

                  <div>價錢: ${amount(values.product.price)}</div>

                  <br />

                  <div>
                    數量: <Field name='quantity' type='number' min='1' max={values.product.inventory} />
                  </div>

                  <br />

                  <button type='submit'>加入購物車</button>

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
