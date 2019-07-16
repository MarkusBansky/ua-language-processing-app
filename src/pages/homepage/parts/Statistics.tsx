import _ from 'lodash'
import React from 'react'
import { connect } from 'react-redux'
import { Card, Timeline } from 'antd'
import { ReducerState } from '../../../modules/reducer'
import Sentence from '../../../processors/parts/Sentence'
import SentenceWord from '../../../processors/parts/SentenceWord';
import WordVariation from '../../../processors/parts/WordVariation';

interface StatisticsProps {
  selectedWords: any,
  selectedVariations: any
  sentences: Sentence[]
  isLoading: boolean,
  reducerError: string
}

class Statistics extends React.Component<StatisticsProps, {}> {
  shouldComponentUpdate(nextProps: StatisticsProps) {
    const { sentences, selectedWords } = this.props

    const sentencesUpdated: boolean =
      sentences !== nextProps.sentences;
    const selectedWordsUpdated: boolean =
      JSON.stringify(selectedWords) !== JSON.stringify(nextProps.selectedWords)

    // console.log(selectedWords, nextProps.selectedWords)

    return sentencesUpdated || selectedWordsUpdated;
  }

  renderWord(word: SentenceWord): JSX.Element {
    return <span>
      <b>{word.getTextValue().toUpperCase()} </b> - {(word.getBestVariation() as WordVariation).toString()}
    </span>
  }

  renderSelectedWords(): JSX.Element {
    const { sentences, selectedWords } = this.props

    if (Object.keys(selectedWords).length === 0) return <></>

    return <Card title="Selected words" size="small" >
      <Timeline style={{ paddingTop: 16 }}>
        {_.map(sentences, (sentence, sIndex) => sentence.words
          .filter(word => selectedWords[word.uuid] === true)
          .map((word, wIndex) =>
            <Timeline.Item key={sIndex + wIndex} > {this.renderWord(word)} </Timeline.Item>
          ))
        }
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

export default connect(mapStateToProps, null)(Statistics);
