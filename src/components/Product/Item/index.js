import React from 'react'

import propTypes from './prop-types'

function Item (props) {
  const { product } = props

  return <div>{product.name}</div>
}

Item.propTypes = propTypes
Item.displayName = 'ProductItem'

export default Item
