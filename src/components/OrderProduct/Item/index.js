import React, { useState } from 'react'
import { Link } from 'react-router-dom'

import { amount } from 'lib/utils/formatter'

import propTypes, { defaultProps } from './prop-types'

function Item (props) {
  const { toPath, orderProduct, isEditable, isRemovable, onQuantityChange, onRemove } = props

  const [quantity, setQuantity] = useState(orderProduct.quantity)

  return (
    <div style={{ margin: 20, padding: '0 20px', border: '1px solid #eee' }}>
      <h3>
        <Link to={toPath}>{orderProduct.name}</Link>
      </h3>

      <h4 style={{ color: 'red' }}>${amount(orderProduct.price)}</h4>

      <div>
        <h5>
          數量
          {isEditable ? (
            <>
              <input
                type='number'
                min='1'
                max={orderProduct.inventory}
                value={quantity}
                onChange={event => setQuantity(Number(event.target.value))}
              />
              <button onClick={event => onQuantityChange(event, orderProduct, quantity)}>更新</button>
            </>
          ) : (
            <span> {quantity}</span>
          )}
        </h5>
        <h5>
          剩下 {orderProduct.inventory} {orderProduct.unit}商品
        </h5>
      </div>

      <hr />

      <h5 style={{ color: 'red' }}>總計 ${amount(orderProduct.subtotal)}</h5>

      {isRemovable && (
        <div style={{ marginBottom: 20 }}>
          <button style={{ color: 'red' }} onClick={event => onRemove(event, orderProduct)}>
            刪除
          </button>
        </div>
      )}
    </div>
  )
}

Item.propTypes = propTypes
Item.defaultProps = defaultProps
Item.displayName = 'OrderProductItem'

export default Item
