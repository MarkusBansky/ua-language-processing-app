import React, { Component } from "react";
import _ from 'lodash';
import ACTIONS from "../modules/action";
import { connect } from "react-redux";
import { Row, Col, Input, Card, Spin, Typography } from "antd";
import Word from "../components/Word";
import Axios from "axios";

const { TextArea } = Input;
const { Text } = Typography

export function predictPOSTag(tagsForWord, callback) {
  const client = Axios.create({
    baseURL:'http://localhost:8080/api/v1',
    responseType: 'json'
  });

  client.post('/predictPOSTag', tagsForWord)
    .then(function (response) {
    callback(response.data);
  })
  .catch(function (error) {
    console.log(error);
  });
}

export function getTagsForWord(word, pt, nt) {
  let trainRows = []

  word.variations.forEach(v => {
    trainRows.push({ leftWordTagId: pt ? pt.id : 0, rightWordTagId: nt ? nt.id : 0, mainWordTagId: v.posTag ? v.posTag.id : 0, correct: 1 })
  })

  return trainRows
}

export function getWordBestTag(word) {
  if (!word) return null
  const v = word.getBestVariation()
  if (!v) return null
  const t = v.posTag
  if (!t) return null
  return t
}

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
    const { analysedWords, predictPOSTag } = this.props;

    return <Card style={{ marginTop: 32 }} >
      {_.map(analysedWords, (word, i) => {
        let previousWord = i < 1 ? null : analysedWords[i - 1]
        let nextWord = i === analysedWords.length - 1 ? null : analysedWords[i + 1]

        return <Word
          key={i}
          index={i}
          word={word}
          pt={getWordBestTag(previousWord)}
          nt={getWordBestTag(nextWord)}
        />
      })}
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
