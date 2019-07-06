import React, { Component } from "react";
import _ from 'lodash';
import ACTIONS from "../modules/action";
import { connect } from "react-redux";
import { Row, Col, Input, Card, Spin} from "antd";
import Word from "../components/Word";

const { TextArea } = Input;

class Homepage extends Component {
  constructor(params) {
    super(params);

    this.onTextChangedEvent = this.onTextChangedEvent.bind(this);
  }

  onTextChangedEvent(e) {
    const { analyseSentence } = this.props
    const text = e.target.value

    let sentences = text.split('.').map(s => s.trim());
    _.forEach(sentences, sentence => {
      analyseSentence(sentence);
    });
  }

  renderAnalysedText() {
    const { analysedWords } = this.props;

    return <Card style={{ marginTop: 32 }} >
      {_.map(analysedWords, (word, i) => <Word key={i} index={i} analysedWord={word} />)}
    </Card>
  }

  render() {
    const { loading } = this.props;

    return <div>
      <Row style={{marginTop:'100px'}}>
        <Col span={12} offset={6}>
          <h1>Ukrainian NLP {loading ? <Spin /> : ''}</h1>
          <p>
            This application analyses the text you input. Please enter your text in the textbox and the application will transform it as you type.
          </p>
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
    </div>
  }
}

const mapStateToProps = state => ({
  analysedWords: state.analysedWords,
  loading: state.loading
});

const mapDispatchToProps = dispatch => ({
  analyseSentence: sentence => dispatch(ACTIONS.analyseSentence(sentence))
});

export default connect(mapStateToProps, mapDispatchToProps)(Homepage);
