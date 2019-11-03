export class Receiver {
  constructor ({ name, phone, address }) {
    this.name = name
    this.phone = phone
    this.address = address
  }

  get data () {
    return { ...this }
  }
}

export class Order {
  constructor ({ id, payment, orderProducts, shipping, receiver, status = Order.Status.Unpaid, createdAt = new Date().toISOString(), remark }) {
    this.id = id
    this.payment = payment
    this.orderProducts = orderProducts
    this.shipping = shipping
    this.receiver = receiver
    this.status = status
    this.createdAt = createdAt
    this.remark = remark
  }

  get data () {
    return { ...this }
  }

  get statusText () {
    return Order.StatusText[this.status]
  }

  static Status = {
    Unpaid: 1,
    Paid: 2,
  }

  static StatusText = {
    [Order.Status.Unpaid]: '未付款',
    [Order.Status.Paid]: '已付款',
  }
}
