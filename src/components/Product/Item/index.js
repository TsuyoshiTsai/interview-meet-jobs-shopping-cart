import React from 'react'
import { Link } from 'react-router-dom'

import { amount } from 'lib/utils/formatter'

import propTypes from './prop-types'

function Item (props) {
  const { toPath, product } = props

  return (
    <div style={{ margin: 20, padding: 20, border: '1px solid #eee' }}>
      <Link to={toPath} style={{ display: 'block' }}>
        {product.name}
      </Link>
      <div>
        庫存: {product.inventory} {product.unit}
      </div>
      <div>價錢: ${amount(product.price)}</div>
    </div>
  )
}

Item.propTypes = propTypes
Item.displayName = 'ProductItem'

export default Item
