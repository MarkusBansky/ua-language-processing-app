export default class Tag {
  constructor(tag) {
    this.name = tag.tag
    this.meaning = tag.meaning
    this.single = tag.conflicting
  }

  toString() {
    return `(${this.name[0]}) ${this.meaning}`
  }
}
