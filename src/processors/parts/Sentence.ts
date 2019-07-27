import SentenceWord from "./SentenceWord";

export default class Sentence {
  public words: SentenceWord[] = []
  public sentenceId: number = 0

  constructor(words: SentenceWord[], index: number) {
    this.words = words
    this.sentenceId = index
  }

  public getId(): number {
    return this.sentenceId;
  }

  public getWord(i: number): SentenceWord {
    return this.words[i]
  }

  public getWords(): SentenceWord[] {
    return this.words;
  }

  public hasWordById(uuid: string): boolean {
    return this.getWordById(uuid) !== undefined
  }

  public getWordById(uuid: string): SentenceWord | undefined {
    return this.words.find(word => word.uuid === uuid)
  }
}
