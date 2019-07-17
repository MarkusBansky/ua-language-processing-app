import VariationTag from "../processors/parts/VariationTag"
import SentenceWord from "../processors/parts/SentenceWord"
import Sentence from '../processors/parts/Sentence';
import { WordTagColors } from './Colors';

export function sortCollectionByParam(field, reverse, primer){

  var key = primer ?
      function(x) {return primer(x[field])} :
      function(x) {return x[field]};

  reverse = !reverse ? 1 : -1;

  return function (a, b) {
    return a = key(a), b = key(b), reverse * (((a > b) ? 1 : -1) - ((b > a) ? 1 : -1));
  }
}

export function findWordInSentences
  (wordId: string, sentences: Sentence[]): SentenceWord | undefined {
  for (var i = 0; i < sentences.length; i++) {
    if (sentences[i].hasWordById(wordId)) {
      return sentences[i].getWordById(wordId)
    }
  }
  return undefined
}

export function generateColorForWord(word: SentenceWord): string {
  const { wordValue } = word;
  const variation = word.getBestVariation()

  if (!wordValue || !variation || !variation.posTag) return '';

  // TODO: Here is a color for the word that has no best variation and has multiple tag variations
  let sortedVariations = word.variations.sort((a, b) => a.probability > b.probability ? 1 : -1)
  if (sortedVariations.length > 1 && sortedVariations[0].probability - sortedVariations[1].probability <= 0.5 && sortedVariations.some(v => v.additionalTags.some(t => t.name.startsWith('v_')))) {
    return WordTagColors.Unpredicted
  }

  if (variation.posTag.name === 'noun') return WordTagColors.Noun
  if (variation.posTag.name === 'adj') return WordTagColors.Adjective
  if (variation.posTag.name === 'adv') return WordTagColors.Adverb
  if (variation.posTag.name === 'verb') return WordTagColors.Verb

  return ''
}

export function toFirstUpperLetter(s: string): string {
  return s.charAt(0).toUpperCase() + s.slice(1)
}


export function extractPosTag(tags: any): VariationTag | null {
  for (var i = 0; i < tags.length; i++)
    if (tags[i].isMainPartOfSpeech)
      return new VariationTag(tags[i])

  if (tags.length === 0) {
    return tags[0]
  }
  return null
}

export function generateTrainWord(
  word: SentenceWord, tagLeftId: number, tagRightId: number) {
  return {
    tagId: word.getBestVariation()!.posTag!.id,
    tagLeftId,
    tagRightId
  }
}
