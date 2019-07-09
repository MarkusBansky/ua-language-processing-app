import Variation from "./Variation";

export default class Word {
  constructor(wordFromAPI) {
    this.word = wordFromAPI.word
    this.variations = wordFromAPI.analysis
      ? wordFromAPI.analysis.map(a => new Variation(a))
      : null
  }

  getBestVariation() {
    console.log(this.variations.sort((a, b) => a.probability < b.probability))
    return !this.variations || this.variations.length === 0
      ? null
      : this.variations.sort((a, b) => a.probability < b.probability)[0]
  }
}
