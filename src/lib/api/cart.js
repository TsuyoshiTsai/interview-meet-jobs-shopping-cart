import axios from 'axios'
import * as service from 'lib/api/_service'
import { Cart } from 'lib/models/cart'
import { OrderProduct } from 'lib/models/product'

export const fetchCart = () => {
  return service.shoppingCart({
    method: 'GET',
    url: '/cart',
    params: {
      _expand: 'product',
    },
    transformResponse: axios.defaults.transformResponse.concat([data => new Cart(data.map(({ product, ...rest }) => ({ ...product, ...rest })))]),
  })
}

export const fetchCartItemCount = () => {
  return service.shoppingCart({
    method: 'GET',
    url: '/cart',
    transformResponse: axios.defaults.transformResponse.concat([
      data => data.map(orderProduct => orderProduct.quantity).reduce((acc, quantity) => acc + quantity, 0),
    ]),
  })
}

export const addOrderProduct = ({ product, quantity }) => {
  return service.shoppingCart({
    method: 'POST',
    url: '/cart',
    data: {
      product,
      quantity,
    },
    transformRequest: [(data, headers) => OrderProduct.request(data.product, data.quantity)].concat(axios.defaults.transformRequest),
  })
}

export const removeOrderProduct = ({ id }) => {
  return service.shoppingCart({
    method: 'DELETE',
    url: `/cart/${id}`,
  })
}

export const updateOrderProductQuantity = ({ id, quantity }) => {
  return service.shoppingCart({
    method: 'PATCH',
    url: `/cart/${id}`,
    data: {
      quantity,
    },
  })
}
