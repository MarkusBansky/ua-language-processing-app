import React, { Component } from "react";
import _ from 'lodash';
import ACTIONS from "../modules/action";
import { connect } from "react-redux";
import { Row, Col, Input, Card, Spin, Typography } from "antd";
import Word from "../components/Word";

const { TextArea } = Input;
const { Text } = Typography

class Homepage extends Component {
  constructor(params) {
    super(params);

    this.onTextChangedEvent = this.onTextChangedEvent.bind(this);
  }

  onTextChangedEvent(e) {
    const { analyseSentence } = this.props
    const text = e.target.value

    if (text.length === 0
      || (text[text.length - 1] !== ' '
      && text[text.length - 1] !== '.'))
      return

    let sentences = text.split('.').map(s => s.trim());
    _.forEach(sentences, sentence => {
      analyseSentence(sentence);
    });
  }

  renderAnalysedText() {
    const { analysedWords } = this.props;

    return <Card style={{ marginTop: 32 }} >
      {_.map(analysedWords, (word, i) => <Word key={i} index={i} word={word} />)}
    </Card>
  }

  render() {
    const { loading, elapsed } = this.props;

    return <div>
      <Row style={{marginTop:'100px'}}>
        <Col span={12} offset={6}>
          <h1>Ukrainian NLP {loading ? <Spin /> : ''}</h1>
          <p>
            This application analyses the text you input. Please enter your text in the textbox and the application will transform it as you type.
          </p>
          <Text mark>Analysed in: {elapsed}ms</Text>
        </Col>
      </Row>
      <Row>
        <Col span={12} offset={6}>
          <TextArea
            size="large"
            placeholder="Введіть ваш текст українською мовою."
            onChange={this.onTextChangedEvent}
            autosize />
        </Col>
      </Row>
      <Row>
        <Col span={12} offset={6}>
          {this.renderAnalysedText()}
        </Col>
      </Row>
      <Row style={{marginTop: 25}}>
        <Col span={12} offset={6}>
          <div id="word_info"></div>
        </Col>
      </Row>
    </div>
  }
}

const mapStateToProps = state => ({
  analysedWords: state.analysedWords,
  loading: state.loading,
  elapsed: state.elapsed
});

const mapDispatchToProps = dispatch => ({
  analyseSentence: sentence => dispatch(ACTIONS.analyseSentence(sentence))
});

export default connect(mapStateToProps, mapDispatchToProps)(Homepage);
