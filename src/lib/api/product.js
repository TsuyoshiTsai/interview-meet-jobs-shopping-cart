import axios from 'axios'
import * as service from 'lib/api/service'
import { Product } from 'lib/models/product'

export const fetchProducts = ({ page, perPage = 10 } = {}) => {
  return service.shoppingCart({
    method: 'GET',
    url: '/products',
    params: {
      _page: page,
      _limit: perPage,
    },
    transformResponse: axios.defaults.transformResponse.concat([data => data.map(product => new Product(product))]),
  })
}
