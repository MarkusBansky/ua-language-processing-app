import VariationTag from "./VariationTag"
import { extractPosTag } from '../../Utils'
import { toFirstUpperLetter } from '../../Utils'

const uuidv1 = require('uuid/v1')

export default class WordVariation {
  relevantWordId: number = 0
  uuid: string = null

  posOriginalForm: string = null
  posTag: VariationTag = null
  additionalTags: VariationTag[] = []
  probability: number = 0

  constructor(analysis: any) {
    this.relevantWordId = analysis.id
    this.uuid = uuidv1()

    this.posOriginalForm = analysis.original
    this.posTag = extractPosTag(analysis.tags)
    this.additionalTags = analysis.tags
      .map((t: VariationTag) => new VariationTag(t))
      .filter((t: VariationTag) => this.posTag && t.name !== this.posTag.name)
  }

  setProbability(p: number): void {
    console.log('Setting probability to ' + p)
    this.probability = p
  }

  toString(): string {
    let at = ': ' + this.additionalTags
      .map(t => t.meaning)
      .join(', ')

    if (!this.posTag)
      return this.additionalTags.map(t => t.toString()).join(', ')


    return `${toFirstUpperLetter(this.posTag.meaning)}${this.additionalTags.length > 0 ? at : ''}`
  }
}
