import PropTypes from 'prop-types'
import { Product } from 'lib/models/product'

export default {
  toPath: PropTypes.string,
  product: PropTypes.instanceOf(Product),
}
