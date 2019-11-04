import axios from 'axios'
import * as service from 'lib/api/_service'
import { Order } from 'lib/models/order'

export const createOrder = ({ payment, orderProducts, shipping, receiver, remark } = {}) => {
  return service.shoppingCart({
    method: 'POST',
    url: '/orders',
    data: {
      payment,
      orderProducts,
      shipping,
      receiver,
      remark,
    },
    transformRequest: [(data, headers) => Order.request(data)].concat(axios.defaults.transformRequest),
  })
}
