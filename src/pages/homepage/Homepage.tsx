import _ from 'lodash'
import React, {ReactNode} from 'react'
import SelectionsPanel from './SelectionsPanel'
import { Row, Col, Typography, Tabs } from 'antd'
import Title from 'antd/lib/typography/Title'
import TextAnalysisControls from './TextInputPanel'
import AnalysisPanel from './AnalysisPanel'

import '../../styles/Homepage.scss'

const COL_WIDTH: number = 16
const COL_OFFSET: number = (24 - COL_WIDTH) / 2

/**
 * Main page of the application
 */
class Homepage extends React.Component<{}, { tab: string }> {
  constructor(params) {
    super(params)

    this.state = {
      tab: 'write'
    }
  }

  changeTab = (key: string) => {
    this.setState({ tab: key })
  }

  //Renders header with the logo and title
  renderHeader() {
    return <Col span={COL_WIDTH} offset={COL_OFFSET}>
      <Typography>
        <img className='logo' src='/logo.png' alt='ukr_nlp' width='80' />
        <Title>Ukrainian NLP</Title>
      </Typography>
    </Col>
  }

  renderSelectionsPanel() {
    return <Tabs.TabPane tab='Selections' key='selections'>
      <SelectionsPanel />
    </Tabs.TabPane>
  }

  // Renders the right column wich has a list of selected words
  // with ability to edit each of them and view additional information.
  renderAnalysisPanel() {
    return <Tabs.TabPane tab='Analysis Results' key='analysis'>
      <AnalysisPanel />
    </Tabs.TabPane>
  }

  // Renders left column wich has a field to enter the text and the
  // Display field for analysed words.
  renderTextPanel() {
    return <Tabs.TabPane tab='Input Text' key='write'>
      <TextAnalysisControls />
    </Tabs.TabPane>
  }

  // Renders the whole page.
  render(): ReactNode {
    return <div className='homepage'>
      <Row style={{ paddingTop: '50px' }}>
        {this.renderHeader()}
      </Row>
      <Row>
        <Col span={COL_WIDTH} offset={COL_OFFSET}>
          <Tabs activeKey={this.state.tab} onChange={this.changeTab}>
            {this.renderTextPanel()}
            {this.renderAnalysisPanel()}
            {this.renderSelectionsPanel()}
          </Tabs>
        </Col>
      </Row>
    </div>
  }
}

// Connect component with mappers
export default Homepage;
