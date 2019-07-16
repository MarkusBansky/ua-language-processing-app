import VariationTag from "./VariationTag"
import { extractPosTag } from '../../Utils'
import { toFirstUpperLetter } from '../../Utils'

const uuidv4 = require('uuid/v4')

export default class WordVariation {
  relevantWordId: number = 0
  uuid: string = ''

  posOriginalForm: string = ''
  posTag: VariationTag | null = null
  additionalTags: VariationTag[] = []
  probability: number = 0

  constructor(variation: any) {
    this.relevantWordId = variation.id
    this.uuid = uuidv4()

    this.posOriginalForm = variation.originalFormOfWord
    this.posTag = extractPosTag(variation.tags)

    let tags = variation.tags.map((t: VariationTag) => new VariationTag(t))
    this.additionalTags = tags
      .filter((t: VariationTag) => this.posTag && t.name !== this.posTag.name)
      .filter((t: VariationTag) => this.posTag && t.connected !== ''
        ? this.posTag.name === t.connected || tags.find(tt => tt.name === t.connected) : true)
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
