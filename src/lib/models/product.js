export class IProduct {
  constructor ({ id, name, unit, price, inventory } = {}) {
    this.id = id
    this.name = name
    this.unit = unit
    this.price = price
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
  constructor ({ id, productId, quantity, product } = {}) {
    super(product)

    this.id = id
    this.productId = productId
    this.quantity = quantity
  }

  get data () {
    return { ...this }
  }

  static request (product, quantity) {
    return { productId: product.id, quantity }
  }
}
