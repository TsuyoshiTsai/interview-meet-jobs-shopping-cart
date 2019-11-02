class IProduct {
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

export class OrderProduct extends IProduct {
  constructor ({ productId, quantity, ...rest } = {}) {
    super(rest)

    this.productId = productId
    this.quantity = quantity
  }

  get data () {
    return { ...this }
  }
}
