import React from 'react'
import { Tooltip } from 'antd'
import SentenceWord from '../processors/parts/SentenceWord'
import { toFirstUpperLetter } from '../utils/Utils';

interface WordWithTooltipProps {
  word: SentenceWord
}

class WordWithTooltip extends React.Component<WordWithTooltipProps, {}> {
  wrapperTitle(word: SentenceWord) {
    return <b>{
      toFirstUpperLetter(word.getBestVariation()!.posTag!.meaning)
    }</b>
  }

  render() {
    const { word } = this.props

    return (
      <Tooltip title={this.wrapperTitle(word)}>
        {word.wordValue}
      </Tooltip>
    )
  }

}

export default WordWithTooltip
