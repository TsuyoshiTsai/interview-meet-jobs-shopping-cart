import { OrderProduct } from 'lib/models/product'
import { Shipping } from 'lib/models/shipping'
import { Payment } from 'lib/models/payment'

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
  constructor ({ id, amount, payment, orderProducts, shipping, receiver, status, createdAt, remark }) {
    this.id = id
    this.amount = amount
    this.payment = new Payment(payment)
    this.orderProducts = orderProducts.map(orderProduct => new OrderProduct(orderProduct))
    this.shipping = new Shipping(shipping)
    this.receiver = new Receiver(receiver)
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

  static request ({ amount, payment, orderProducts, shipping, receiver, remark }) {
    return {
      amount,
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
