export class IProduct {
  constructor ({ id, name, unit, price, description } = {}) {
    this.id = id
    this.name = name
    this.unit = unit
    this.price = price
    this.description = description
  }
}

export class Product extends IProduct {
  constructor ({ inventory, ...rest } = {}) {
    super(rest)

    this.inventory = inventory
  }

  get data () {
    return { ...this }
  }
}

export class OrderProduct extends Product {
  constructor ({ id, productId, quantity, ...rest } = {}) {
    super(rest)

    this.id = id
    this.productId = productId
    this.quantity = quantity
  }

  get data () {
    return { ...this }
  }

  get subtotal () {
    return this.price * this.quantity
  }

  static request (product, quantity) {
    return { productId: product.id, quantity }
  }

  calculateNextInventory () {
    return this.inventory - this.quantity
  }
}
