import React from 'react'
import { Badge } from 'antd'
import WordWithPopover from './WordWithPopover'
import { generateColorForWord } from '../utils/Utils'
import SentenceWord from '../models/SentenceWord';
import { connect } from 'react-redux'
import ACTIONS from '../actions/ApiActions'
import WordWithTooltip from './WordWithTooltip'

import '../styles/Word.scss'
import ICombinedReducer from '../interfaces/ICombinedReducer';

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

  /**
  * Used to call the toggling word function
  */
  toggleWordSelection(wordId: string) {
    const { toggleWordForTraining } = this.props
    toggleWordForTraining(wordId);
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
    );
  }

  renderSelectionBadge() {
    const { word, selectedWords } = this.props;
    const isSelected = selectedWords.find((wordId: string) => wordId === word.uuid) !== undefined;

    return (
      <Badge dot={isSelected} style={{right: 8}}>
        {this.renderWrapper(generateColorForWord(word))}
      </Badge>
    );
  }

  render() {
    return (
      <span className='word'>
        {this.renderSelectionBadge()}
      </span>
    )
  }
}

const mapStateToProps = (reducers: ICombinedReducer) => ({
  selectedWords: reducers.applicationStateReducer.selectedWords
});

const mapDispatchToProps = {
  toggleWordForTraining: ACTIONS.toggleWordForTraining
};

export default connect(mapStateToProps, mapDispatchToProps)(Word);
