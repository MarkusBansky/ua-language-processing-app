
import _ from 'lodash'
import React from 'react'
import Sentence from '../models/Sentence'
import { Row, Col } from 'antd'
import Word from './Word';

interface SentenceRowProps {
  sentence: Sentence
}

class SentenceRow extends React.Component<SentenceRowProps, {}> {
  renderSentence() {
    return _.map(
      this.props.sentence.words,
      (word, index) => <span key={index} className='word'><Word word={word} /></span>)
  }

  render() {
    if (!this.props.sentence)
      return <span>Missing sentences!</span>

    return (
      <Row>
        <Col span={12}>
          {this.renderSentence()}
        </Col>
        <Col span={12}>

        </Col>
      </Row>
    )
  }
}

export default SentenceRow
