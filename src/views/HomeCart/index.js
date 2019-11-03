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
    </>
  )
}

export default HomeCart
