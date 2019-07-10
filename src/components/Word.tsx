import React from 'react'
import { Tag } from 'antd'
import WordWrapper from './WordWrapper'
import { generateColorForWord } from '../Utils'
import SentenceWord from '../processors/parts/SentenceWord';

interface WordProperties {
  word: SentenceWord
}

class Word extends React.Component<WordProperties, {}> {
  renderTagWithText(text: string, color: string) {
    return <Tag style={{ marginBottom: 5 }} color={color}>
      {text}
    </Tag>
  }

  renderWrapper(color: string) {
    const { word } = this.props;

    return <WordWrapper word={word} >
      {this.renderTagWithText(word.getTextValue(), color)}
    </WordWrapper>
  }

  render() {
    const { word } = this.props
    return this.renderWrapper(generateColorForWord(word))
  }
}

export default Word;
