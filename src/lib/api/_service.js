import axios from 'axios'

export const shoppingCart = axios.create({
  baseURL: 'http://localhost:3001/',
})
