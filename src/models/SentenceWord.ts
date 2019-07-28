import WordVariation from './SentenceWordVariation';
import { toFirstUpperLetter } from '../utils/Utils';

const uuidv4 = require('uuid/v4');
const variationSortFunction = (a: any, b: any) => a.uuid.localeCompare(a.uuid);

export default class SentenceWord {
  uuid: string;

  sentenceIndex: number;
  wordIndex: number;
  wordValue: string;
  variations: WordVariation[];

  constructor(wordFromAPI: any, wordIndex: number, sentenceIndex: number) {
    this.uuid = uuidv4();

    this.wordIndex = wordIndex;
    this.sentenceIndex = sentenceIndex;
    this.wordValue = wordFromAPI.word;
    this.variations = wordFromAPI.variations
      ? wordFromAPI.variations.map((v: WordVariation) => new WordVariation(v))
      : [];

    this.variations = this.variations.sort(variationSortFunction);
  }

  getRelevantId(): number {
    let v = this.getBestVariation();
    return v ? v.relevantWordId : 0;
  }

  getRelevantSelectionId(id: string): number {
    let v = this.getVariationById(id);
    return v ? v.relevantWordId : 0;
  }

  getTextValue(): string {
    return this.wordIndex === 0
      ? toFirstUpperLetter(this.wordValue)
      : this.wordValue;
  }

  getVariationById(id: string): WordVariation | undefined {
    if (!id) throw new Error('Variation id does not exist!');
    return this.variations.find(v => v.uuid === id);
  }

  getVariationByIndex(index: number): WordVariation {
    if (index >= this.variations.length) throw new Error('Variation index is out of bounds!');
    return this.variations[index];
  }

  getBestVariation(): WordVariation | null {
    return !this.variations || this.variations.length === 0
      ? null
      : this.variations.sort(variationSortFunction)[0];
  }
}
