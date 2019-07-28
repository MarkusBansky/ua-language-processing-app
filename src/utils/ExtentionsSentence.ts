import Sentence from "../models/Sentence";
import SentenceWord from '../models/SentenceWord';

export function getSentenceFromArray(data: { words: any[], index: number }): Sentence {
  let words = data.words.map((word, i) => new SentenceWord(word, i, data.index));
  return new Sentence(words, data.index);
}
