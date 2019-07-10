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
    return <div>
      <p>You can choose the correct POS:</p>
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
