import axios from 'axios'
import * as service from 'lib/api/_service'
import { Order } from 'lib/models/order'

export const createOrder = ({ amount, payment, orderProducts, shipping, receiver, remark } = {}) => {
  return service.shoppingCart({
    method: 'POST',
    url: '/orders',
    data: {
      amount,
      payment,
      orderProducts,
      shipping,
      receiver,
      remark,
    },
    transformRequest: [(data, headers) => Order.request(data)].concat(axios.defaults.transformRequest),
  })
}

export const fetchOrders = () => {
  return service.shoppingCart({
    method: 'GET',
    url: '/orders',
    transformResponse: axios.defaults.transformResponse.concat([(data, headers) => data.map(order => new Order(order))]),
  })
}
