import { OrderProduct } from 'lib/models/product'

export class Cart {
  constructor (orderProducts) {
    this.orderProducts = orderProducts.map(orderProduct => new OrderProduct(orderProduct))
  }

  get data () {
    return { ...this }
  }

  get orderProductCount () {
    return this.orderProducts.length
  }

  get orderProductQuantities () {
    return this.orderProducts.map(orderProduct => orderProduct.quantity).reduce((acc, quantity) => acc + quantity, 0)
  }

  get orderProductAmount () {
    return this.orderProducts.map(orderProduct => orderProduct.quantity * orderProduct.price).reduce((acc, subtotal) => acc + subtotal, 0)
  }

  findByProduct (product) {
    return this.orderProducts.find(orderProduct => orderProduct.productId === product.id)
  }

  hasProduct (product) {
    return this.orderProducts.map(orderProduct => orderProduct.productId).includes(product.id)
  }
}
