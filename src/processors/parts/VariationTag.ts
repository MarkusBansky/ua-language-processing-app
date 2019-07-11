export default class VariationTag {
  id: number = 0
  name: string = null
  connected: string = null
  meaning: string = null
  single: boolean = false

  constructor(tag: any) {
    this.id = tag.id
    this.name = tag.tag
    this.meaning = tag.meaning
    this.single = tag.conflicting
    this.connected = tag.connected
  }

  toString(): string {
    return `(${this.name[0]}) ${this.meaning}`
  }
}
