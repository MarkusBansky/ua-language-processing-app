import React from 'react'
import { Popover } from 'antd'
import WordTagDropdown from './WordTagDropdown'
import SentenceWord from '../processors/parts/SentenceWord';

interface WordWrapperProperties {
  word: SentenceWord
}

class WordWrapper extends React.Component<WordWrapperProperties, {}> {

  wrapperTitle(word: SentenceWord) {
    return <b>{word.getTextValue()}</b>
  }

  wrapperContent(word: SentenceWord) {
    if (word.variations.length === 0) {
      return <span>Word not found in database.</span>
    }
    if (word.variations.length === 1) {
      return <span>{word.getBestVariation().toString()}</span>
    }

    return <div>
      <WordTagDropdown word={word}/>
    </div>
  }

  render() {
    const { word, children } = this.props

    return <Popover
      content={this.wrapperContent(word)}
      title={this.wrapperTitle(word)}
    >
      {children}
    </Popover>
  }

}

export default WordWrapper
