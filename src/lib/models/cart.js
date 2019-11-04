import { OrderProduct } from 'lib/models/product'

export class Cart {
  constructor (orderProducts) {
    this.orderProducts = orderProducts.map(orderProduct => new OrderProduct(orderProduct))
  }

  get data () {
    return { ...this }
  }

  get itemCount () {
    return this.orderProducts.map(orderProduct => orderProduct.quantity).reduce((acc, quantity) => acc + quantity, 0)
  }

  get amount () {
    return this.orderProducts.map(orderProduct => orderProduct.quantity * orderProduct.price).reduce((acc, subtotal) => acc + subtotal, 0)
  }

  getOrderProductDictionary () {
    return this.orderProducts.reduce((dic, orderProduct) => ({ ...dic, [orderProduct.id]: orderProduct }), {})
  }

  findByProductId (productId) {
    return this.orderProducts.find(orderProduct => orderProduct.productId === productId)
  }

  hasProduct (productId) {
    return this.orderProducts.map(orderProduct => orderProduct.productId).includes(productId)
  }

  getDifferenceOrderProducts (orderProducts) {
    const dictionary = this.getOrderProductDictionary()

    return orderProducts.filter(orderProduct => typeof dictionary[orderProduct.id] === 'undefined')
  }

  getInvalidQuantityOrderProducts (orderProducts) {
    const dictionary = this.getOrderProductDictionary()

    return orderProducts.filter(orderProduct => orderProduct.quantity !== dictionary[orderProduct.id].quantity)
  }

  getOutOfInventoryOrderProducts () {
    const dictionary = this.getOrderProductDictionary()

    return this.orderProducts.filter(orderProduct => orderProduct.inventory < dictionary[orderProduct.id].quantity)
  }
}
