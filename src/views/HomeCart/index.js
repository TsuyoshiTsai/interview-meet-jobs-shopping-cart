import React from 'react'
import { Link, useRouteMatch } from 'react-router-dom'

import Product from 'components/Product'

import useCart from 'lib/effects/useCart'

function HomeCart () {
  const [cart] = useCart()
  const match = useRouteMatch()
  const replacedUrl = match.url.replace('cart', '')

  return cart.orderProducts.length > 0 ? (
    <>
      <Product.List>
        {cart.orderProducts.map((orderProduct, index) => (
          <Product.Item key={index} product={orderProduct} />
        ))}
      </Product.List>

      <div>小計：{cart.orderProductAmount}</div>

      <Link to={`${replacedUrl}checkout`}>去買單</Link>
    </>
  ) : (
    <>
      <div>您還沒有購買任何商品</div>

      <Link to={`${replacedUrl}product`}>去買東西</Link>
    </>
  )
}

export default HomeCart
