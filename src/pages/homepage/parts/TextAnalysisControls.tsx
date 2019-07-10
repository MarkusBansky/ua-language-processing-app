import React, { SyntheticEvent } from "react"
import _ from 'lodash'
import ACTIONS from "../../../modules/action"
import { connect } from "react-redux"
import { Row, Col, Alert, Button, Divider } from "antd"
import Sentence from "../../../processors/parts/Sentence"
import { ReducerState } from '../../../modules/reducer'
import TextArea from 'antd/lib/input/TextArea'
import ButtonGroup from 'antd/lib/button/button-group';
import SentencesCard from './SentencesCard';

interface TextAnalysisControlsProps {
  sentences: Sentence[],
  isLoading: boolean,
  reducerError: any,
  analyseSentence: any,
  selectedVariations: any
}

interface TextAnalysisControlsState {
  text: string
}

class TextAnalysisControls extends
  React.Component<TextAnalysisControlsProps, TextAnalysisControlsState> {
  constructor(params: any) {
    super(params);

    this.state = {
      text: "Сьогодні була дуже гарна погода, сонячні промені гарнезно грали на тінях довколишніх дерев."
    }

    this.handleTrainOnClick =
      this.handleTrainOnClick.bind(this)
    this.handleTextOnChange =
      this.handleTextOnChange.bind(this)
    this.handleAnalyseButtonOnClick =
      this.handleAnalyseButtonOnClick.bind(this)
  }

  handleTrainOnClick() {
    const { sentences, selectedVariations } = this.props

    let inputs = _.map(sentences, sentence => _.map(sentence.words, (word, i) => {
      let wordVariationId = selectedVariations[word.uuid]
      let wordVariation = wordVariationId
        ? word.getVariationById(wordVariationId)
        : word.getBestVariation()

      return wordVariation && wordVariation.posTag ? wordVariation.posTag.id : 0
    }))

    console.log(inputs)
  }

  handleTextOnChange(e: SyntheticEvent) {
    this.setState({ ...this.state, text: (e.target as any).value })
  }

  handleAnalyseButtonOnClick() {
    const { text } = this.state
    const { analyseSentence } = this.props

    if (text.length === 0) return

    let sentences = text.split('.').map(s => s.trim());
    _.forEach(sentences, sentence => {
      analyseSentence(sentence);
    });
  }

  renderError() {
    const { reducerError } = this.props

    if (!reducerError) return ''

    return <Alert
      message="Error Text"
      description={reducerError}
      type="error"
      closable
    />
  }

  renderActionButtons() {
    const { sentences, isLoading } = this.props
    const canTrain = sentences.length > 0

    return <div>
      <Button
        type="primary"
        loading={isLoading}
        onClick={this.handleAnalyseButtonOnClick}>
          Analyse
        </Button>

      <ButtonGroup style={{marginLeft: 16}}>
        <Button
          type="default"
          icon="tags"
          disabled={!canTrain}
          onClick={this.handleTrainOnClick}>
          Read tags
        </Button>
        <Button type="default" icon="calculator" disabled={!canTrain}>
          Train sentences
        </Button>
      </ButtonGroup>
    </div>
  }

  render() {
    const { sentences } = this.props

    return <div>
      <Row>
        <Col>
          <Divider>Enter your text</Divider>
          <TextArea
            ref='text'
            placeholder="Введіть ваш текст українською мовою."
            defaultValue={this.state.text}
            onChange={this.handleTextOnChange}
            autosize={{ minRows: 2 }} />
        </Col>
      </Row>
      <Row><Col>{this.renderActionButtons()}</Col></Row>
      <Row><Col>
        <SentencesCard sentences={sentences} />
      </Col></Row>
      <Row><Col>{this.renderError()}</Col></Row>
    </div>
  }
}

const mapStateToProps = (state: ReducerState) => ({
  sentences: state.sentences,
  isLoading: state.isLoading,
  reducerError: state.reducerError,
  selectedVariations: state.selectedVariations
});

const mapDispatchToProps = dispatch => ({
  analyseSentence: (sentence: string) => dispatch(ACTIONS.analyseSentence(sentence))
});

export default connect(mapStateToProps, mapDispatchToProps)(TextAnalysisControls);
