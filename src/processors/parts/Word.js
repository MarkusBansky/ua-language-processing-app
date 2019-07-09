import Variation from "./Variation";

export default class Word {
  constructor(wordFromAPI) {
    this.word = wordFromAPI.word
    this.variations = wordFromAPI.analysis
      ? wordFromAPI.analysis.map(a => new Variation(a))
      : null
  }

  getBestVariation() {
    // TODO: Change in future to get percentage for the variation
    return !this.variations || this.variations.length === 0
      ? null
      : this.variations.length === 1
        ? this.variations[0]
        : this.variations[0]
  }
}
