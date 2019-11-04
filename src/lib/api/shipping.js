import axios from 'axios'
import * as service from 'lib/api/_service'
import { Shipping } from 'lib/models/shipping'

export const fetchShippings = () => {
  return service.shoppingCart({
    method: 'GET',
    url: '/shippings',
    transformResponse: axios.defaults.transformResponse.concat([data => data.map(shipping => new Shipping(shipping))]),
  })
}
