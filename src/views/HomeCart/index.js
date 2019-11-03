import React from 'react'

import Product from 'components/Product'

import useCart from 'lib/effects/useCart'

function HomeCart () {
  const [cart] = useCart()

  return (
    <>
      <Product.List>
        {cart.orderProducts.map((orderProduct, index) => (
          <Product.Item key={index} product={orderProduct} />
        ))}
      </Product.List>

      <div>小計：{cart.orderProductAmount}</div>
    </>
  )
}

export default HomeCart
