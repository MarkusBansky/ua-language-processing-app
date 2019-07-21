import React from 'react'
import _ from 'lodash'
import { connect } from 'react-redux'
import { Card, Divider, Skeleton, Empty } from 'antd'
import Word from '../../components/Word'
import Sentence from '../../processors/parts/Sentence'

interface SentencesCardProps {
  sentences: Sentence[],
  isLoading: boolean
}

class AnalysisPanel extends React.Component<SentencesCardProps, {}> {

  renderSentence(sentence: Sentence) {
    return sentence.words.map((word, i) => <Word key={i} word={word} />)
  }

  renderEmpty() {
    return <Empty
      style={{marginTop: 60}}
      description={<span>You have no analysed text</span>} />
  }

  render() {
    const { sentences, isLoading } = this.props;

    if (sentences.length === 0) return this.renderEmpty()

    return <Skeleton loading={isLoading} active>
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

const mapStateToProps = (reducers: any) => ({
  sentences: reducers.analysisApiReducer.sentences,
  isLoading: reducers.analysisApiReducer.isAnalysisRequestLoading
})

export default connect(mapStateToProps, null)(AnalysisPanel);
