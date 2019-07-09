import React, { Component } from "react";
import { Tag } from "antd";
import WordWrapper from "./WordWrapper";
import { getTagsForWord, predictPOSTag } from "../pages/Homepage";

function generateColor(word, variation) {
  if (!word || !variation) return '';

  if (variation.posTag.name === 'noun') return 'cyan'
  if (variation.posTag.name === 'adj') return 'magenta'
  if (variation.posTag.name === 'adv') return 'volcano'
  if (variation.posTag.name === 'verb') return 'blue'
}

const toFirstUpperLetter = (string) =>
  string.charAt(0).toUpperCase() + string.slice(1)

class Word extends Component {
  constructor(params) {
    super(params)
    const { word, pt, nt } = this.props
    this.word = word

    this.predictionsReady = this.predictionsReady.bind(this)

    let tags = getTagsForWord(word, pt, nt)
    predictPOSTag(tags, this.predictionsReady)
  }

  predictionsReady(probs) {
    console.log('Received probabilities: ', probs)
    if (this.word.variations.length === 1) {
      this.word.variations[0].setProbability(probs[0])
    } else {
      probs.forEach(p => {
        for (var i = 0; i < this.word.variations.length; i++) {
          this.word.variations[i].setProbability(probs[i])
        }
      })
    }

    this.forceUpdate()
  }

  renderAsTag(color, text) {
    return <Tag style={{marginBottom: 5}} color={color}>{text}</Tag>
  }

  renderAsText(color, text) {
    return <span style={{marginRight: 8}}>{text}</span>
  }

  renderWrapper(color) {
    const { index, pt, nt } = this.props;
    let text = index === 0 ? toFirstUpperLetter(this.word.word) : this.word.word;

    return <WordWrapper word={this.word} pt={pt} nt={nt} >
      {this.word.variations && this.word.variations.length > 1
        ? this.renderAsTag(color, text)
        : this.renderAsText(color, text)}
    </WordWrapper>
  }

  render() {
    let color = generateColor(this.word.word, this.word.getBestVariation())

    return this.renderWrapper(color)
  }
}

export default Word;
