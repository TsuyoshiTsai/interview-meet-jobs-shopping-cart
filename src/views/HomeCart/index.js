import React, { Fragment } from 'react'
import { Link, useRouteMatch } from 'react-router-dom'

import OrderProduct from 'components/OrderProduct'

import * as CartApi from 'lib/api/cart'
import useCart from 'lib/effects/useCart'
import useFetcher from 'lib/effects/useFetcher'
import withFetching from 'lib/hocs/withFetching'
import * as formatter from 'lib/utils/formatter'

const FragmentWithFetching = withFetching(Fragment)

function HomeCart () {
  const [, updateEffectCart] = useCart()
  const [cartResponse, cartStatus, updateCart] = useFetcher({ fetcher: CartApi.fetchCart })

  const match = useRouteMatch()
  const replacedUrl = match.url.replace('cart', '')

  const onOrderProductQuantityChange = (event, orderProduct, quantity) => {
    CartApi.updateOrderProductQuantity({ id: orderProduct.id, quantity }).then(() => {
      updateCart()
      updateEffectCart()
    })
  }
  const onOrderProductRemove = (event, orderProduct) => {
    CartApi.removeOrderProduct({ id: orderProduct.id }).then(() => {
      updateCart()
      updateEffectCart()
    })
  }

  return (
    <FragmentWithFetching
      {...cartStatus}
      render={() => {
        return cartResponse.data.orderProducts.length > 0 ? (
          <>
            <OrderProduct.List>
              {cartResponse.data.orderProducts.map((orderProduct, index) => (
                <OrderProduct.Item
                  key={index}
                  toPath={`${replacedUrl}product/${orderProduct.productId}`}
                  orderProduct={orderProduct}
                  onQuantityChange={onOrderProductQuantityChange}
                  onRemove={onOrderProductRemove}
                />
              ))}
            </OrderProduct.List>

            <div style={{ padding: '0 20px' }}>
              <h2>
                購買總金額 <span style={{ color: 'red' }}>${formatter.amount(cartResponse.data.amount)}</span>
              </h2>

              <Link to={`${replacedUrl}checkout`}>去買單</Link>
            </div>
          </>
        ) : (
          <div style={{ padding: 20 }}>
            <div>你的購物車還是空的</div>

            <Link to={`${replacedUrl}product`}>去買東西</Link>
          </div>
        )
      }}
    />
  )
}

export default HomeCart
