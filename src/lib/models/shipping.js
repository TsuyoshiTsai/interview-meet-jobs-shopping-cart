export class Shipping {
  constructor ({ id, name }) {
    this.id = id
    this.name = name
  }

  get data () {
    return { ...this }
  }
}
