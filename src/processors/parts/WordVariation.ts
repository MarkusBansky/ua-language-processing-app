import VariationTag from "./VariationTag"
import { extractPosTag } from '../../Utils'
import { toFirstUpperLetter } from '../../Utils'

const uuidv4 = require('uuid/v4')

export default class WordVariation {
  relevantWordId: number = 0
  uuid: string = null

  posOriginalForm: string = null
  posTag: VariationTag = null
  additionalTags: VariationTag[] = []
  probability: number = 0

  constructor(analysis: any) {
    this.relevantWordId = analysis.id
    this.uuid = uuidv4()

    this.posOriginalForm = analysis.original
    this.posTag = extractPosTag(analysis.tags)

    let tags = analysis.tags.map((t: VariationTag) => new VariationTag(t))
    this.additionalTags = tags
      .filter((t: VariationTag) => this.posTag && t.name !== this.posTag.name)
      .filter((t: VariationTag) => this.posTag && t.connected !== ''
        ? this.posTag.name === t.connected || tags.find(tt => tt.name === t.connected) : true)
  }

  setProbability(p: number): void {
    console.log('Setting probability to ' + p)
    this.probability = p
  }

  getAllTagIDs(): number[] {
    let result = this.posTag ? [this.posTag.id] : []
    this.additionalTags.forEach(tag => result.push(tag.id))
    return result
  }

  mergeTagInto(tag: VariationTag): void {
    if (!this.additionalTags.find(t => t.id === tag.id)) {
      this.additionalTags.push(tag)
    }
  }

  toString(): string {
    let tags = this.additionalTags.map(t => t.meaning)

    let composition = (tags && tags.length > 0
      ? ': ' + tags.join(', ')
      : '')

    if (!this.posTag)
      return this.additionalTags
        .map(t => t.toString()).join(', ')


    return `${toFirstUpperLetter(this.posTag.meaning)}${composition}`
  }
}
