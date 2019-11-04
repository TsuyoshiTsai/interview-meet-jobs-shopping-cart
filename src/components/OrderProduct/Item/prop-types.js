import PropTypes from 'prop-types'
import { OrderProduct } from 'lib/models/product'

export default {
  toPath: PropTypes.string,
  orderProduct: PropTypes.instanceOf(OrderProduct),
  isEditable: PropTypes.bool,
  isRemovable: PropTypes.bool,
  onQuantityChange: PropTypes.func,
  onRemove: PropTypes.func,
}

export const defaultProps = {
  isEditable: true,
  isRemovable: true,
}
