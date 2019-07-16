import _ from 'lodash'
import React, {ReactNode} from 'react'
import { connect } from 'react-redux'
import Statistics from './parts/Statistics'
import { Row, Col, Typography } from 'antd'
import Title from 'antd/lib/typography/Title'
import { ReducerState } from '../../modules/reducer'
import TextAnalysisControls from './parts/TextAnalysisControls'
import SentencesCard from './parts/SentencesCard';
import Sentence from '../../processors/parts/Sentence';

class Homepage extends React.Component<{ sentences: Sentence[] }, {}> {
  render(): ReactNode {
    const { sentences } = this.props

    return <div>
      <Row style={{ marginTop: '100px' }}>
        <Col span={12} offset={3} className='padded-col'>
          <Typography>
            <Title>Ukrainian NLP</Title>
          </Typography>
          <TextAnalysisControls />
          <SentencesCard sentences={sentences} />
        </Col>
        <Col span={6} className='padded-col' >
          <Statistics />
        </Col>
      </Row>
      <Row style={{ marginTop: 24 }}>
        <Col span={18} offset={3} className='padded-col' >
        </Col>
      </Row></div>
  }
}

const mapStateToProps = (state: ReducerState) => ({
  sentences: state.sentences,
  isLoading: state.isLoading,
  reducerError: state.reducerError
});

export default connect(mapStateToProps, null)(Homepage);
