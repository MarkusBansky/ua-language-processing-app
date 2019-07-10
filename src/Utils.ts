import VariationTag from "./processors/parts/VariationTag"
import SentenceWord from "./processors/parts/SentenceWord"

export function generateColorForWord(word: SentenceWord): string {
  const { wordValue } = word;
  const variation = word.getBestVariation()

  if (!wordValue || !variation) return '';

  if (variation.posTag.name === 'noun') return 'cyan'
  if (variation.posTag.name === 'adj') return 'magenta'
  if (variation.posTag.name === 'adv') return 'volcano'
  if (variation.posTag.name === 'verb') return 'blue'

  return ''
}

export function toFirstUpperLetter(s: string): string {
  return s.charAt(0).toUpperCase() + s.slice(1)
}


export function extractPosTag(tags: any): VariationTag {
  for (var i = 0; i < tags.length; i++)
    if (tags[i].is_pos)
      return new VariationTag(tags[i])

  if (tags.length === 0) {
    return tags[0]
  }
  return null
}
