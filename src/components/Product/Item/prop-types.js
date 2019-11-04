import PropTypes from 'prop-types'
import { IProduct } from 'lib/models/product'

export default {
  toPath: PropTypes.string,
  product: PropTypes.instanceOf(IProduct),
}
