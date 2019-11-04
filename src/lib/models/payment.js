export class Payment {
  constructor ({ id, name }) {
    this.id = id
    this.name = name
  }

  get data () {
    return { ...this }
  }
}
