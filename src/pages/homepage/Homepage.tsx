import React, { ReactNode } from 'react';
import { connect } from 'react-redux';
import { Row, Col, Typography, Tabs } from 'antd';
import Title from 'antd/lib/typography/Title';
import TextAnalysisControls from './HomepageInput';
import AnalysisPanel from './HomepageAnalysis';
import { switchTabs } from '../../actions/ApplicationActions';

import '../../styles/Homepage.scss';

const COL_WIDTH: number = 16;
const COL_OFFSET: number = (24 - COL_WIDTH) / 2;

export enum MenuTabs {
  Input = 'write',
  AnalysisResults = 'analysis'
};

/**
 * Main page of the application
 */
class Homepage extends React.Component<{ switchTabs: any, selectedTab: string }, {}> {

  changeTab = (key: string) => {
    this.props.switchTabs(key);
  };

  //Renders header with the logo and title
  renderHeader() {
    return (
      <Col span= { COL_WIDTH } offset = { COL_OFFSET } >
        <Typography>
          <img className='logo' src = '/logo.png' alt = 'ukr_nlp' width = '80' />
          <Title>Ukrainian NLP </Title>
        </Typography>
      </Col>
    )
  }

  // Renders the right column wich has a list of selected words
  // with ability to edit each of them and view additional information.
  renderAnalysisPanel() {
    return (
      <Tabs.TabPane tab='Analysis Results' key = { MenuTabs.AnalysisResults } >
        <AnalysisPanel />
      </Tabs.TabPane>
    )
  }

  // Renders left column wich has a field to enter the text and the
  // Display field for analysed words.
  renderTextPanel() {
    return (
      <Tabs.TabPane tab='Input Text' key = { MenuTabs.Input } >
        <TextAnalysisControls />
      </Tabs.TabPane>
    )
  }

  // Renders the whole page.
  render(): ReactNode {
    const { selectedTab } = this.props

    return <div className='homepage' >
      <Row style={ { paddingTop: '50px' } }>
        { this.renderHeader() }
      </Row>
      <Row>
        <Col span={ COL_WIDTH } offset = { COL_OFFSET } >
          <Tabs activeKey={ selectedTab } onChange = { this.changeTab } >
            { this.renderTextPanel() }
            { this.renderAnalysisPanel() }
          </Tabs>
        </Col>
      </Row>
    </div>
  }
};

const mapStateToProps = (reducers: any) => ({
  selectedWords: reducers.reducer.selectedWords,
  selectedTab: reducers.applicationStateReducer.selectedMenuTab
});

const mapDispatchToProps = {
  switchTabs
};

// Connect component with mappers
export default connect(mapStateToProps, mapDispatchToProps)(Homepage);
