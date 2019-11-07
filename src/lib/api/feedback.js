import axios from 'axios'
import * as service from 'lib/api/_service'
import { Feedback } from 'lib/models/feedback'

export const createFeedback = ({ title, content }) => {
  return service.shoppingCart({
    method: 'POST',
    url: '/feedbacks',
    data: {
      title,
      content,
    },
    transformRequest: [(data, headers) => Feedback.request(data)].concat(axios.defaults.transformRequest),
  })
}
