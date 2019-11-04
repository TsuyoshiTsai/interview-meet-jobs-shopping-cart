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
  constructor ({ id, payment, orderProducts, shipping, receiver, status, createdAt, remark }) {
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

  static request ({ payment, orderProducts, shipping, receiver, remark }) {
    return {
      payment,
      orderProducts,
      shipping,
      receiver,
      status: Order.Status.Unpaid,
      createdAt: Date.now(),
      remark,
    }
  }

  static Status = {
    Unpaid: 1,
    Paid: 2,
    Delivering: 3,
    Delivered: 4,
    Completed: 5,
    Refunded: 6,
  }

  static StatusText = {
    [Order.Status.Unpaid]: '待付款',
    [Order.Status.Paid]: '待出貨',
    [Order.Status.Delivering]: '配送中',
    [Order.Status.Delivered]: '待收貨',
    [Order.Status.Completed]: '完成',
    [Order.Status.Refunded]: '取消',
  }
}
