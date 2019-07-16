import SentenceWord from "./parts/SentenceWord"
import Sentence from "./parts/Sentence";

export function getSentenceFromArray(data: { words: any[], index: number }): Sentence {
  let words = data.words.map((word, i) => new SentenceWord(word, i, data.index))
  return new Sentence(words, data.index)
}
