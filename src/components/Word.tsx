import React from 'react'
import { Badge } from 'antd'
import WordWithPopover from './WordWithPopover'
import { generateColorForWord } from '../utils/Utils'
import SentenceWord from '../processors/parts/SentenceWord'
import { connect } from 'react-redux'
import ACTIONS from '../actions/action'
import WordWithTooltip from './WordWithTooltip'

import '../styles/Word.scss'

interface WordProperties {
  word: SentenceWord,
  selectedWords: any,
  toggleWordForTraining: (wordId: string) => any
}

class Word extends React.Component<WordProperties, {}> {
  constructor(params: any) {
    super(params)
    this.toggleWordSelection = this.toggleWordSelection.bind(this)
  }

  toggleWordSelection(wordId: string) {
    const { toggleWordForTraining } = this.props
    toggleWordForTraining(wordId)
  }

  renderWrapper(color: string) {
    const { word } = this.props;

    return (
      <span onClick={() => this.toggleWordSelection(word.uuid)}>
        {
          word.variations.length > 1
            ? <WordWithPopover word={word} />
            : <WordWithTooltip word={word} />
        }
      </span>
    )
  }

  renderSelectionBadge() {
    const { word, selectedWords } = this.props
    const isSelected = selectedWords.find((wordId: string) => wordId === word.uuid) !== undefined

    return (
      <Badge dot={isSelected} style={{right: 8}}>
        {this.renderWrapper(generateColorForWord(word))}
      </Badge>
    )
  }

  render() {
    return (
      <span className='word'>
        {this.renderSelectionBadge()}
      </span>
    )
  }
}

const mapStateToProps = (reducers: any) => ({
  selectedWords: reducers.reducer.selectedWords
});

const mapDispatchToProps = (dispatch: any) => ({
  toggleWordForTraining: (wordId: string) => dispatch(ACTIONS.toggleWordForTraining(wordId))
});

export default connect(mapStateToProps, mapDispatchToProps)(Word);
