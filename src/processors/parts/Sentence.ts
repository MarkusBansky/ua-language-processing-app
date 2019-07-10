import SentenceWord from "./SentenceWord";

export default class Sentence {
  words: SentenceWord[] = []
  sentenceId: number = 0

  constructor(words: SentenceWord[], index: number) {
    this.words = words
    this.sentenceId = index
  }

  getWord(i: number): SentenceWord {
    return this.words[i]
  }
}
