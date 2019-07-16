import _ from 'lodash'
import { connect } from "react-redux"
import React, { SyntheticEvent } from "react"
import ACTIONS from "../../../modules/action"
import TextArea from 'antd/lib/input/TextArea'
import { Row, Col, Alert, Button, Divider, message } from 'antd'
import { ReducerState } from '../../../modules/reducer'
import ButtonGroup from 'antd/lib/button/button-group'
import Sentence from '../../../processors/parts/Sentence'
import SentenceWord from '../../../processors/parts/SentenceWord';
import TrainRequest from '../../../processors/TrainRequest';
import { findWordInSentences } from '../../../Utils';

interface TextAnalysisControlsProps {
  sentences: Sentence[],
  isLoading: boolean,
  reducerError: any,
  analyseSentence: any,
  selectedVariations: any,
  selectedWords: any,
  traingPOSTag: (sentencesWordsData: any[]) => any,
  predictPOSTag: (sentencesWordsData: any[]) => any
}

interface TextAnalysisControlsState {
  text: string
}

class TextAnalysisControls extends
  React.Component<TextAnalysisControlsProps, TextAnalysisControlsState> {
  constructor(params: any) {
    super(params);

    this.state = {
      text: "Сьогодні була дуже гарна погода, сонячні промені грали на тінях довколишніх дерев."
    }

    this.handlePredictOnClick =
      this.handlePredictOnClick.bind(this)
    this.handleTrainOnClick =
      this.handleTrainOnClick.bind(this)
    this.handleTextOnChange =
      this.handleTextOnChange.bind(this)
    this.handleAnalyseButtonOnClick =
      this.handleAnalyseButtonOnClick.bind(this)
  }

  getSelectedWords(): TrainRequest[] {
    const { sentences, selectedVariations, selectedWords } = this.props

    var requests = selectedWords.map((wordId: string) => {
      let word: SentenceWord = findWordInSentences(wordId, sentences) as any
      let hasSelectedVariation = selectedVariations[word.uuid] !== undefined
      let selectedVariation = hasSelectedVariation ?
        word.getVariationById(selectedVariations[word.uuid])
        : word.getBestVariation()

      let request = new TrainRequest()
      request.wordId = word.uuid

      // Set selected word values for this request
      request.selectedWordPOSTagId = selectedVariation!.posTag!.id
      request.selectedWordPredictedTagId = selectedVariation!.additionalTags.find(t => t.name.startsWith('v_'))!.id - 54 || 0

      let numberOfWords = sentences[word.sentenceIndex].words.length

      // Set left word if it exists
      if (word.wordIndex !== 0) {
        request.leftWordPOSTagId = sentences[word.sentenceIndex]
          .getWord(word.wordIndex - 1).getBestVariation()!.posTag!.id || 0
      } else {
        request.leftWordPOSTagId = 0
      }

      // Set right word if it exists
      if (word.wordIndex !== numberOfWords - 1) {
        request.rightWordPOSTagId = sentences[word.sentenceIndex]
          .getWord(word.wordIndex + 1).getBestVariation()!.posTag!.id || 0
      } else {
        request.rightWordPOSTagId = 0
      }

      return request
    })

    return requests
  }

  handleTrainOnClick() {
    const { traingPOSTag } = this.props

    message.success('Your TRAIN request has been sent to the server. Please wait while it finishes.', 5);
    traingPOSTag(this.getSelectedWords())
  }

  handlePredictOnClick() {
    const { predictPOSTag } = this.props

    message.success('Your PREDICT request has been sent to the server. Please wait while it finishes.', 5);
    predictPOSTag(this.getSelectedWords())
  }

  handleTextOnChange(e: SyntheticEvent) {
    this.setState({ ...this.state, text: (e.target as any).value })
  }

  handleAnalyseButtonOnClick() {
    const { text } = this.state
    const { analyseSentence } = this.props

    if (text.length === 0) return

    let sentences = text.split('.').map(s => s.trim()).filter(s => s !== '');
    _.forEach(sentences, (sentence, index) => {
      analyseSentence(index, sentence);
    });
  }

  renderError() {
    const { reducerError } = this.props

    if (!reducerError) return ''

    let errorDescription = reducerError.response.data.error + '. ' + reducerError.response.data.message

    return <Alert
      message="Error Text"
      description={errorDescription}
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

      <ButtonGroup style={{ marginLeft: 16 }}>
        <Button
          type="default"
          icon="calculator"
          disabled={!canTrain}
          onClick={this.handleTrainOnClick}>
          Train model with selected variations
        </Button>
        <Button
          type="default"
          icon="tags"
          disabled={!canTrain}
          onClick={this.handlePredictOnClick}>
          Predict tags based on neural model
        </Button>
      </ButtonGroup>
    </div>
  }

  render() {
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
      <Row><Col>{this.renderError()}</Col></Row>
    </div>
  }
}

const mapStateToProps = (state: ReducerState) => ({
  sentences: state.sentences,
  isLoading: state.isLoading,
  reducerError: state.reducerError,
  selectedVariations: state.selectedVariations,
  selectedWords: state.selectedWords
});

const mapDispatchToProps = (dispatch: any) => ({
  analyseSentence: (index: number, sentence: string) => dispatch(ACTIONS.analyseSentence(index, sentence)),
  traingPOSTag: (sentencesWordsData: any[]) => dispatch(ACTIONS.traingPOSTag(sentencesWordsData)),
  predictPOSTag: (sentencesWordsData: any[]) => dispatch(ACTIONS.predictPOSTag(sentencesWordsData))
});

export default connect(mapStateToProps, mapDispatchToProps)(TextAnalysisControls);
