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
    this.additionalTags = analysis.tags
      .map((t: VariationTag) => new VariationTag(t))
      .filter((t: VariationTag) => this.posTag && t.name !== this.posTag.name)
      .filter((t: VariationTag) => this.posTag && t.connected
        ? this.posTag.name === t.connected : true)
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
    let conflicting = this.additionalTags
      .filter(t => t.single).map(t => t.meaning)
    let notConflicting = this.additionalTags
      .filter(t => !t.single).map(t => t.meaning)

    let composition = (notConflicting && notConflicting.length > 0
      ? notConflicting.join(', ')
      : '')
      + '; ' +
      (conflicting ? conflicting.length > 1
      ? `[${conflicting.join(', ')}]`
      : conflicting.length === 0 ? conflicting[0] : '' : '')

    if (!this.posTag)
      return this.additionalTags
        .map(t => t.toString()).join(', ')


    return (conflicting && conflicting.length > 0) || (notConflicting && notConflicting.length > 0) ?
      `${toFirstUpperLetter(this.posTag.meaning)}: ${composition}`
      : toFirstUpperLetter(this.posTag.meaning)
  }
}
