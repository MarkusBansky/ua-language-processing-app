import Tag from "./Tag";

export default class Variation {
  constructor(analysis) {
    this.posOriginalForm = analysis.original
    this.posTag = this.extractPosTag(analysis.tags)
    this.additionalTags = analysis.tags
      .map(t => new Tag(t))
      .filter(t => t.name !== this.posTag.name)

    this.probability = 0
  }

  setProbability(p) {
    console.log('Setting probability to ' + p)
    this.probability = p
  }

  extractPosTag(tags) {
    for (var i = 0; i < tags.length; i++)
      if (tags[i].is_pos)
        return new Tag(tags[i])
    return null
  }

  toString() {
    let at = ': ' + this.additionalTags
      .map(t => t.meaning.substring(0, 4) + '.')
      .join(', ')

    return `[${this.posTag.name.substring(0, 4) + '.'}] ${this.posTag.meaning}${this.additionalTags.length > 0 ? at : ''}`
  }
}
