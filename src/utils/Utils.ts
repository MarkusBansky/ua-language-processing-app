import _ from 'lodash'
import VariationTag from "../processors/parts/VariationTag"
import SentenceWord from "../processors/parts/SentenceWord"
import Sentence from '../processors/parts/Sentence'
import { WordTagColors } from './Colors'

/**
 * Searches for a desired word in chosen array of sentences.
 * @param wordId String of ID by which to search for a word.
 * @param sentences Array of sentences where to search.
 */
export function findWordInSentences
  (wordId: string, sentences: Sentence[]): SentenceWord | undefined {
  for (var i = 0; i < sentences.length; i++) {
    if (sentences[i].hasWordById(wordId)) {
      return sentences[i].getWordById(wordId)
    }
  }
  return undefined
}

/**
 * Generates color string for the selected word [posTag].
 * @param word An object of type [[SentenceWord]] that color is generated for.
 */
export function generateColorForWord(word: SentenceWord): string {
  const { wordValue } = word;
  const variation = word.getBestVariation()

  // If there is no word or it does not have a variation or
  // the variation does not have a tag then return nothing
  if (!wordValue || !variation || !variation.posTag) return '';

  // Display a color for the word that has no best variation and
  // has multiple tag variations
  // Sort the variations
  let sortedVariations = _.sortBy(word.variations, v => v.probability)
  // Check the conditions if rthere are any two variations
  if (sortedVariations.length > 1
    // And the probability is far from distinct
    && sortedVariations[0].probability - sortedVariations[1].probability <= 0.5
    // And there are some tags with v_ that FIXME:Later
    && sortedVariations.some(v => v.additionalTags.some(t => t.name.startsWith('v_')))) {
    // Return UNPREDICTED
    return WordTagColors.Unpredicted
  }

  // Otherwise for each pos tag name return it's color
  if (variation.posTag.name === 'noun') return WordTagColors.Noun
  if (variation.posTag.name === 'adj') return WordTagColors.Adjective
  if (variation.posTag.name === 'adv') return WordTagColors.Adverb
  if (variation.posTag.name === 'verb') return WordTagColors.Verb

  // If there is no color for a tag then return nothing
  return ''
}

/**
 * Sets first letter to upper case and all others to lower case.
 * @param s The text that has to be modified.
 */
export function toFirstUpperLetter(s: string): string {
  return s.charAt(0).toUpperCase() + s.slice(1)
}

/**
 * Looks for the main tag in the array of tags from API. Returns a [VariationTag].
 * @param tags An array of tag objects returned from API
 */
export function extractPosTag(tags: any[]): VariationTag | null {
  // Loop through every tag
  for (var i = 0; i < tags.length; i++)
    // If this tag has a flag of main part of speech
    if (tags[i].isMainPartOfSpeech)
      // Then return the result
      return new VariationTag(tags[i])

  // Otherwise if the length of tags is 0 return null
  return null
}
