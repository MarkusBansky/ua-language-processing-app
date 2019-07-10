import React from 'react'
import _ from 'lodash'
import { connect } from 'react-redux'
import { Card, Alert, Divider } from 'antd'
import Word from '../../../components/Word'
import Sentence from '../../../processors/parts/Sentence'

interface SentencesCardProps {
  sentences: Sentence[]
}

class SentencesCard extends
  React.Component<SentencesCardProps, {}> {
  constructor(params: any) {
    super(params);
  }

  renderSentence(sentence: Sentence) {
    return sentence.words.map((word, i) => <Word key={i} word={word} />)
  }

  render() {
    const { sentences } = this.props;

    if (sentences.length === 0) return ''

    return <div>
        <Divider>Result</Divider>
        <Card>
          {_.map(sentences, (sentence, i) =>
            <div key={i}>{this.renderSentence(sentence)}</div>
          )}
          <Divider dashed />
          <Alert
            message="Training and Predicting"
            description="Some words can have multiple variations available. Each variation has a diffirent sequence of tags for it. In the sentence you can only have a single variation selected. To do this right, a neural network service is used and you are able to train it and evaluate the predictions for current sentence. To use this service you can adjust each variation selection by hovering the word and selecting correct variation from a dropdown that appears. Later to train the model you may click one of the buttons above, the other one is for predicting."
            type="info"
          />
        </Card>
      </div>
  }
}

export default connect(null, null)(SentencesCard);
