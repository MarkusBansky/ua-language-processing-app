import _ from 'lodash'
import React from 'react'
import { connect } from 'react-redux'
import { Row, Col, Card, Statistic, Timeline, Alert } from 'antd'
import { ReducerState } from '../../../modules/reducer'
import Sentence from '../../../processors/parts/Sentence'
import SentenceWord from '../../../processors/parts/SentenceWord';

interface StatisticsProps {
  selectedWords: any,
  selectedVariations: any
  sentences: Sentence[]
  isLoading: boolean,
  reducerError: string
}

class Statistics extends React.Component<StatisticsProps, {}> {
  shouldComponentUpdate(nextProps) {
    const { sentences, selectedWords } = this.props

    const sentencesUpdated: boolean =
      sentences !== nextProps.sentences;
    const selectedWordsUpdated: boolean =
      JSON.stringify(selectedWords) !== JSON.stringify(nextProps.selectedWords)

    console.log(selectedWords, nextProps.selectedWords)

    return sentencesUpdated || selectedWordsUpdated;
  }

  renderWord(word: SentenceWord) {
    return <span>
      <b>{word.getTextValue().toUpperCase()}</b> - {word.getBestVariation().toString()}
    </span>
  }

  renderSelectedWords() {
    const { sentences, selectedWords } = this.props

    if (Object.keys(selectedWords).length === 0)
      return <Alert message="Click on the analysed word tag in order to select or deselect it." type="info"/>

    return <Card title="Selected words">
      <Timeline>
        {_.map(sentences, (sentence, sIndex) => sentence.words
          .filter(word => selectedWords[word.uuid] === true)
          .map((word, wIndex) =>
            <Timeline.Item key={sIndex + wIndex}>{this.renderWord(word)}</Timeline.Item>
          ))}
      </Timeline>
    </Card>
  }

  render() {
    return <div>
      <Card title="Usage analysis and statisitcs" style={{marginBottom: 16}}>
        <Row gutter={16}>
          <Col span={12}>
            <Statistic title="Last call in" value={93} suffix=" ms" />
          </Col>
          <Col span={12}>
            <Statistic title="Calls made" value={3} />
          </Col>
        </Row>
      </Card>
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
