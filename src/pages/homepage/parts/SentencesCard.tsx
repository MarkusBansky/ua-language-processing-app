import React from 'react'
import _ from 'lodash'
import { connect } from 'react-redux'
import { Card, Divider, Skeleton, Tag } from 'antd'
import Word from '../../../components/Word'
import Sentence from '../../../processors/parts/Sentence'
import { ReducerState } from '../../../modules/reducer';
import { WordTagColors } from '../../../utils/Colors';

interface SentencesCardProps {
  sentences: Sentence[],
  isLoading: boolean
}

class SentencesCard extends
  React.Component<SentencesCardProps, {}> {
  constructor(params: any) {
    super(params);
  }

  renderSentence(sentence: Sentence) {
    return sentence.words.map((word, i) => <Word key={i} word={word} />)
  }

  displayMarkings() {
    return _.map(Object.keys(WordTagColors), (color, index) => {
      return <Tag key={index} color={WordTagColors[color]}>{color}</Tag>
    })
  }

  render() {
    const { sentences, isLoading } = this.props;

    if (sentences.length === 0) return ''

    return <Skeleton loading={isLoading} active>
      {/* <Divider>Word tag markings</Divider>
      {this.displayMarkings()} */}
      <Divider>Result</Divider>
      <Card>
        {_.map(sentences, (sentence, i) =>
          sentence ? <span key={i}>{this.renderSentence(sentence)}. </span> : ''
        )}
        <Divider dashed />
      </Card>
    </Skeleton>
  }
}

const mapStateToProps = (state: ReducerState) => ({
  isLoading: state.isLoading
});

export default connect(mapStateToProps, null)(SentencesCard);
