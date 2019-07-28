export default class VariationTag {
  id: number;
  name: string;
  connected: string;
  meaning: string;
  single: boolean;
  isMainPOS: boolean;

  constructor(tag: any) {
    this.id = tag.id;
    this.name = tag.tagName;
    this.meaning = tag.description;
    this.single = tag.isConflicting;
    this.connected = tag.connectedTagName;
    this.isMainPOS = tag.isMainPartOfSpeech;
  }

  toString(): string {
    return `(${this.name[0]}) ${this.meaning}`
  }
}
