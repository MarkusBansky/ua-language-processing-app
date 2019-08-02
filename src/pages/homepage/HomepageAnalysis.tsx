import React from 'react'
import _ from 'lodash'
import { connect } from 'react-redux'
import { Card, Divider, Skeleton, Empty } from 'antd'
import Sentence from '../../models/Sentence'
import SentenceRow from '../../components/SentenceRow'
import ICombinedReducer from '../../interfaces/ICombinedReducer';

interface SentencesCardProps {
  sentences: Sentence[],
  isLoading: boolean
}

class AnalysisPanel extends React.Component<SentencesCardProps, {}> {

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
        {_.map(sentences, (sentence, i) => <SentenceRow key={i} sentence={sentence} />)}
      </Card>
    </Skeleton>
  }
}

const mapStateToProps = (reducers: ICombinedReducer) => ({
  sentences: reducers.analysisApiReducer.sentences,
  isLoading: reducers.analysisApiReducer.isAnalysisRequestLoading
})

export default connect(mapStateToProps, null)(AnalysisPanel);
