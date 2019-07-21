import React from 'react'
import { Tag, Badge } from 'antd'
import WordWrapper from './WordWrapper'
import { generateColorForWord } from '../utils/Utils'
import SentenceWord from '../processors/parts/SentenceWord';
import { connect } from 'react-redux';
import ACTIONS from '../actions/action'

interface WordProperties {
  word: SentenceWord,
  selectedWords: any,
  toggleWordForTraining: (wordId: string) => any
}

class Word extends React.Component<WordProperties, {}> {
  constructor(params: any) {
    super(params)

    this.toggleWordSelection =
      this.toggleWordSelection.bind(this)
  }

  toggleWordSelection(wordId: string) {
    const { toggleWordForTraining } = this.props
    toggleWordForTraining(wordId)
  }

  renderTagWithText(word: SentenceWord, color: string) {
    return <Tag
        style={{ marginBottom: 5 }}
        color={color}
        onClick={() => this.toggleWordSelection(word.uuid)}>
        {word.getTextValue()}
      </Tag>
  }

  renderWrapper(color: string) {
    const { word } = this.props;

    const isAnyTag = color !== ''

    return <WordWrapper word={word}>
      {isAnyTag
        ? this.renderTagWithText(word, color)
        : <span style={{ marginRight: 6 }}>{word.getTextValue()}</span>
      }
    </WordWrapper>
  }

  render() {
    const { word, selectedWords } = this.props
    const isSelected = selectedWords.find(w => w === word.uuid) !== undefined

    return <Badge dot={isSelected} style={{right: 8}}>
      {this.renderWrapper(generateColorForWord(word))}
    </Badge>
  }
}

const mapStateToProps = (reducers: any) => ({
  selectedWords: reducers.reducer.selectedWords
});

const mapDispatchToProps = (dispatch: any) => ({
  toggleWordForTraining: (wordId: string) => dispatch(ACTIONS.toggleWordForTraining(wordId))
});

export default connect(mapStateToProps, mapDispatchToProps)(Word);
