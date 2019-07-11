import WordVariation from "./WordVariation"
import { toFirstUpperLetter } from '../../Utils'

const uuidv4 = require('uuid/v4')

export default class SentenceWord {
  uuid: string = null

  index: number = 0
  wordValue: string = null
  variations: WordVariation[] = []

  constructor(wordFromAPI: any, index: number) {
    this.uuid = uuidv4()

    this.index= index
    this.wordValue = wordFromAPI.word
    this.variations = wordFromAPI.analysis
      ? wordFromAPI.analysis.map((a: WordVariation) => new WordVariation(a))
      : []

    this.mergeVariations()
  }

  mergeVariations(): void {
    var mergedVariations: WordVariation[] = []

    this.variations.map(variation => {
      let exists = mergedVariations
        .find(v => v.posTag && variation.posTag && v.posTag.id === variation.posTag.id)

      if (!exists) {
        mergedVariations.push(variation)
      } else {
        variation.additionalTags.forEach(tag => exists.mergeTagInto(tag))
      }
    })

    this.variations = mergedVariations
  }

  getRelevantId(): number {
    let v = this.getBestVariation();
    return v ? v.relevantWordId : 0
  }

  getRelevantSelectionId(id: string): number {
    let v = this.getVariationById(id);
    return v ? v.relevantWordId : 0
  }

  getTextValue(): string {
    return this.index === 0
      ? toFirstUpperLetter(this.wordValue)
      : this.wordValue;
  }

  getVariationById(id: string): WordVariation {
    if (!id) throw new Error('Variation id does not exist!')
    return this.variations.find(v => v.uuid === id)
  }

  getVariationByIndex(index: number): WordVariation {
    if (index >= this.variations.length) throw new Error('Variation index is out of bounds!')
    return this.variations[index];
  }

  getBestVariation(): WordVariation {
    return !this.variations || this.variations.length === 0
      ? null
      : this.variations
        .sort((a, b) => a.probability < b.probability ? -1 : 1)[0]
  }
}
