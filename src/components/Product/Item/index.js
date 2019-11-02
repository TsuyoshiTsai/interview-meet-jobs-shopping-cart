import React from 'react'

import propTypes from './prop-types'

function Item (props) {
  const { product } = props

  return (
    <div>
      <div>{product.name}</div>
      <div>
        庫存: {product.inventory} {product.unit}
      </div>
      <div>{product.price}</div>
    </div>
  )
}

Item.propTypes = propTypes
Item.displayName = 'ProductItem'

export default Item
