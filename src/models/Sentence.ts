import SentenceWord from './SentenceWord';

export default class Sentence {
  public words: SentenceWord[];
  public sentenceId: number;

  constructor(words: SentenceWord[], index: number) {
    this.sentenceId = index;
    this.words = words;
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
