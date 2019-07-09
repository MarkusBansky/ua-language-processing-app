import Word from "./parts/Word";

export function preprocessWords(wordsFromApi) {
  return wordsFromApi.map(word => new Word(word))
}
