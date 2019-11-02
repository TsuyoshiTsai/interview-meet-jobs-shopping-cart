export class Order {
  constructor ({ id, amount, products, name, phone, address, createdAt, remark }) {
    this.id = id
    this.amount = amount
    this.products = products
    this.name = name
    this.phone = phone
    this.address = address
    this.createdAt = createdAt
    this.remark = remark

    this.status = Order.Status.Unpaid
  }

  get data () {
    return { ...this }
  }

  get statusText () {
    return Order.StatusText[this.status]
  }

  static Status = {
    Unpaid: 0,
    Paid: 1,
  }

  static StatusText = {
    [Order.Status.Unpaid]: '未付款',
    [Order.Status.Paid]: '已付款',
  }
}
