import SentenceWord from "./parts/SentenceWord"
import Sentence from "./parts/Sentence";

export function getSentenceFromArray(wordsFromApi: any[], index: number): Sentence {
  let words = wordsFromApi.map((word, i) => new SentenceWord(word, i))
  return new Sentence(words, index)
}
