import _ from 'lodash'
import React, {ReactNode} from 'react'
import { connect } from 'react-redux'
import Statistics from './parts/Statistics'
import { Row, Col, Typography, PageHeader } from 'antd'
import Title from 'antd/lib/typography/Title'
import { ReducerState } from '../../modules/reducer'
import TextAnalysisControls from './parts/TextAnalysisControls'
import SentencesCard from './parts/SentencesCard';
import Sentence from '../../processors/parts/Sentence';

/**
 * Main page of the application
 */
class Homepage extends React.Component<{ sentences: Sentence[] }, {}> {
  //Renders header with the logo and title
  renderHeader() {
    return <Col span={18} offset={3}>
      <Typography>
        <img style={{position: 'relative', left: -20, top: 8, marginTop: -20}} src='/logo.png' alt='ukr_nlp' width='80' />
        <Title>Ukrainian NLP</Title>
      </Typography>
    </Col>
  }

  // Renders the right column wich has a list of selected words
  // with ability to edit each of them and view additional information.
  renderRightColumn() {
    return <Col span={6} className='padded-col' >
      <Typography>
        <Title level={3}>Selected words</Title>
      </Typography>
      <Statistics />
    </Col>
  }

  // Renders left column wich has a field to enter the text and the
  // Display field for analysed words.
  renderTextPanel() {
    const { sentences } = this.props
    return <Col span={12} offset={3} className='padded-col'>
      <PageHeader title="Enter your text" />
      <TextAnalysisControls />
      <SentencesCard sentences={sentences} />
    </Col>
  }

  // Renders the whole page.
  render(): ReactNode {
    return <div>
      <Row style={{ marginTop: '100px' }}>
        {this.renderHeader()}
      </Row>
      <Row>
        {this.renderTextPanel()}
        {this.renderRightColumn()}
      </Row>
    </div>
  }
}

// Maps reducer properties to the props of the component
const mapStateToProps = (state: ReducerState) => ({
  sentences: state.sentences
});

// Connect component with mappers
export default connect(mapStateToProps, null)(Homepage);
