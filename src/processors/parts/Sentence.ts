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

  hasWordById(uuid: string): boolean {
    return this.getWordById(uuid) !== undefined
  }

  getWordById(uuid: string): SentenceWord | undefined {
    return this.words.find(word => word.uuid === uuid)
  }
}
