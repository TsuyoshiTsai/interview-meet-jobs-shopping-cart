import axios from 'axios'
import * as service from 'lib/api/_service'
import { Payment } from 'lib/models/payment'

export const fetchPayments = () => {
  return service.shoppingCart({
    method: 'GET',
    url: '/payments',
    transformResponse: axios.defaults.transformResponse.concat([data => data.map(payment => new Payment(payment))]),
  })
}
