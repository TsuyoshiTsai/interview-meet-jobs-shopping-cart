export class Cart {
  constructor ({ orderProducts = [] } = {}) {
    this.orderProducts = orderProducts
  }

  get data () {
    return { ...this }
  }

  get orderProductCount () {
    return this.orderProducts.length
  }

  addOrderProduct (orderProduct) {
    this.orderProducts = [...this.orderProducts, orderProduct]
  }

  removeOrderProduct (orderProductId) {
    this.orderProducts = this.orderProducts.filter(orderProduct => orderProduct.id === orderProductId)
  }
}
