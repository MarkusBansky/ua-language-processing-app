import React, { Component } from "react";
import { Tag } from "antd";
import WordWrapper from "./WordWrapper";

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
  renderAsTag(color, text) {
    return <Tag style={{marginBottom: 5}} color={color}>{text}</Tag>
  }

  renderAsText(color, text) {
    return <span style={{marginRight: 8}}>{text}</span>
  }

  renderWrapper(color) {
    const { word, index } = this.props;
    let text = index === 0 ? toFirstUpperLetter(word.word) : word.word;

    return <WordWrapper word={word}>
      {word.variations && word.variations.length > 1
        ? this.renderAsTag(color, text)
        : this.renderAsText(color, text)}
    </WordWrapper>
  }

  render() {
    const { word } = this.props;
    let color = generateColor(word.word, word.getBestVariation())

    return this.renderWrapper(color)
  }
}

export default Word;
