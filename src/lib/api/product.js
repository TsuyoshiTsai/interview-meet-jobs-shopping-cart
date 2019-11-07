import axios from 'axios'
import * as service from 'lib/api/_service'
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

export const fetchProductDetail = ({ id } = {}) => {
  return service.shoppingCart({
    method: 'GET',
    url: `/products/${id}`,
    transformResponse: axios.defaults.transformResponse.concat([data => new Product(data)]),
  })
}

export const updateInventory = ({ id, inventory }) => {
  return service.shoppingCart({
    method: 'PATCH',
    url: `/products/${id}`,
    data: {
      inventory,
    },
  })
}
