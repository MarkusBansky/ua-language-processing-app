import _ from 'lodash'
import React from 'react'
import { connect } from 'react-redux'
import { Card, Timeline, Empty } from 'antd'
import { ReducerState } from '../../modules/reducer'
import Sentence from '../../processors/parts/Sentence'
import SentenceWord from '../../processors/parts/SentenceWord';
import WordVariation from '../../processors/parts/WordVariation';
import { findWordInSentences } from '../../utils/Utils';

interface StatisticsProps {
  selectedWords: any,
  selectedVariations: any
  sentences: Sentence[]
  isLoading: boolean,
  reducerError: string
}

class SelectionsPanel extends React.Component<StatisticsProps, {}> {
  shouldComponentUpdate(nextProps: StatisticsProps) {
    const { sentences, selectedWords } = this.props

    const sentencesUpdated: boolean =
      sentences !== nextProps.sentences;
    const selectedWordsUpdated: boolean =
      JSON.stringify(selectedWords) !== JSON.stringify(nextProps.selectedWords)

    return sentencesUpdated || selectedWordsUpdated;
  }

  renderEmpty() {
    return <Empty
      style={{marginTop: 60}}
      description={<span>You have no words selected</span>} />
  }

  renderWord(word: SentenceWord): JSX.Element {
    return <span>
      <b>{word.getTextValue().toUpperCase()} </b> - {(word.getBestVariation() as WordVariation).toString()}
    </span>
  }

  renderSelectedWords(): JSX.Element {
    const { sentences, selectedWords } = this.props

    if (selectedWords.length === 0)
      return this.renderEmpty()

    return <Card title="Selected words" size="small" >
      <Timeline style={{ paddingTop: 16 }}>
        {_.map(selectedWords, (wordId, i) => {
          let word = findWordInSentences(wordId, sentences) as SentenceWord
          return <Timeline.Item key={i} > {this.renderWord(word)} </Timeline.Item>
        })}
      </Timeline>
    </Card>
  }

  render() {
    return <div>
      {this.renderSelectedWords()}
    </div>
  }
}

const mapStateToProps = (state: ReducerState) => ({
  sentences: state.sentences,
  isLoading: state.isLoading,
  reducerError: state.reducerError,
  selectedWords: state.selectedWords,
  selectedVariations: state.selectedVariations
});

export default connect(mapStateToProps, null)(SelectionsPanel);
