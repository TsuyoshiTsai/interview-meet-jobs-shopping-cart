import PropTypes from 'prop-types'
import { IProduct } from 'lib/models/product'

export default {
  product: PropTypes.instanceOf(IProduct),
}
