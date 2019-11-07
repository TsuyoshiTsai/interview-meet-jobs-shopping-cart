export class Feedback {
  constructor ({ id, title, content }) {
    this.id = id
    this.title = title
    this.content = content
  }

  get data () {
    return { ...this }
  }

  static request ({ title, content }) {
    return {
      title,
      content,
    }
  }
}
