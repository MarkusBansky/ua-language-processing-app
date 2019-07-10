import React from 'react'
import { connect } from 'react-redux'
import { Row, Col, Card, Statistic } from 'antd'
import { ReducerState } from '../../../modules/reducer'
import Sentence from '../../../processors/parts/Sentence'

interface StatisticsProps {
  sentences: Sentence[]
  isLoading: boolean,
  reducerError: string
}

class Statistics extends React.Component<StatisticsProps, {}> {
  render() {
    return <Card title="Usage analysis and statisitcs">
      <Row gutter={16}>
        <Col span={12}>
          <Statistic title="Last call in" value={93} suffix=" ms" />
        </Col>
        <Col span={12}>
          <Statistic title="Calls made" value={3} />
        </Col>
      </Row>
    </Card>
  }
}

const mapStateToProps = (state: ReducerState) => ({
  sentences: state.sentences,
  isLoading: state.isLoading,
  reducerError: state.reducerError
});

export default connect(mapStateToProps, null)(Statistics);
