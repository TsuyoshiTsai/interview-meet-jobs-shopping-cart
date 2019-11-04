import React from 'react'
import { Link } from 'react-router-dom'

import * as formatter from 'lib/utils/formatter'

import propTypes from './prop-types'

function Item (props) {
  const { toPath, product } = props

  return (
    <div style={{ margin: 20, padding: '0 20px', border: '1px solid #eee' }}>
      <h3>
        <Link to={toPath}>{product.name}</Link>
      </h3>

      <h4 style={{ color: 'red' }}>${formatter.amount(product.price)}</h4>

      <h5>
        剩下 {product.inventory} {product.unit}商品
      </h5>
    </div>
  )
}

Item.propTypes = propTypes
Item.displayName = 'ProductItem'

export default Item
