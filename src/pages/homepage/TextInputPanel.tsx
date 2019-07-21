import _ from 'lodash'
import { connect } from "react-redux"
import React, { SyntheticEvent } from "react"
import ACTIONS from '../../actions/action'
import TextArea from 'antd/lib/input/TextArea'
import { Alert, Button, PageHeader, Row, Col, Divider } from 'antd'
import Sentence from '../../processors/parts/Sentence'
import { pageHeaderContent, pageHeaderExtraContent } from './content/TextInputContent'

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

class TextInputPanel extends
  React.Component<TextAnalysisControlsProps, TextAnalysisControlsState> {
  constructor(params: any) {
    super(params);

    this.state = {
      text: "Сьогодні була дуже гарна погода, сонячні промені грали на тінях довколишніх дерев."
    }

    this.handleTextOnChange =
      this.handleTextOnChange.bind(this)
    this.handleAnalyseButtonOnClick =
      this.handleAnalyseButtonOnClick.bind(this)
  }

  // getSelectedWords(): TrainRequest[] {
  //   const { sentences, selectedVariations, selectedWords } = this.props

  //   var requests = selectedWords.map((wordId: string) => {
  //     let word: SentenceWord = findWordInSentences(wordId, sentences) as any
  //     let hasSelectedVariation = selectedVariations[word.uuid] !== undefined
  //     let selectedVariation = hasSelectedVariation ?
  //       word.getVariationById(selectedVariations[word.uuid])
  //       : word.getBestVariation()

  //     let request = new TrainRequest()
  //     request.wordId = word.uuid

  //     // Set selected word values for this request
  //     request.selectedWordPOSTagId = selectedVariation!.posTag!.id
  //     request.selectedWordPredictedTagId = selectedVariation!.additionalTags.find(t => t.name.startsWith('v_'))!.id - 54 || 0

  //     let numberOfWords = sentences[word.sentenceIndex].words.length

  //     // Set left word if it exists
  //     if (word.wordIndex !== 0) {
  //       request.leftWordPOSTagId = sentences[word.sentenceIndex]
  //         .getWord(word.wordIndex - 1).getBestVariation()!.posTag!.id || 0
  //     } else {
  //       request.leftWordPOSTagId = 0
  //     }

  //     // Set right word if it exists
  //     if (word.wordIndex !== numberOfWords - 1) {
  //       request.rightWordPOSTagId = sentences[word.sentenceIndex]
  //         .getWord(word.wordIndex + 1).getBestVariation()!.posTag!.id || 0
  //     } else {
  //       request.rightWordPOSTagId = 0
  //     }

  //     return request
  //   })

  //   return requests
  // }

  // handleTrainOnClick() {
  //   const { traingPOSTag } = this.props

  //   message.success('Your TRAIN request has been sent to the server. Please wait while it finishes.', 5);
  //   traingPOSTag(this.getSelectedWords())
  // }

  // handlePredictOnClick() {
  //   const { predictPOSTag } = this.props

  //   message.success('Your PREDICT request has been sent to the server. Please wait while it finishes.', 5);
  //   predictPOSTag(this.getSelectedWords())
  // }

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
    const { isLoading } = this.props

    return <div>
      <Button
        type="primary"
        loading={isLoading}
        onClick={this.handleAnalyseButtonOnClick}>
        Analyse the text
        </Button>
    </div>
  }

  render() {
    return <div>
      <Row className='page-header'>
        <Col>
          <PageHeader title="Text input page">
            <div className="wrap">
              <div className="content">{pageHeaderContent}</div>
              <div className="extraContent">{pageHeaderExtraContent}</div>
            </div>
          </PageHeader>
        </Col>
      </Row>
      <Divider />
      <Row>
        <Col>
          <TextArea
            ref='text'
            placeholder="Enter your text in Ukrainian language..."
            defaultValue={this.state.text}
            onChange={this.handleTextOnChange}
            autosize={{ minRows: 10 }} />
        </Col>
      </Row>
      <Row>
        <Col>
          {this.renderActionButtons()}
        </Col>
      </Row>
      <Row>
        <Col>
          {this.renderError()}
        </Col>
      </Row>
    </div>
  }
}

const mapStateToProps = (reducers: any) => ({
  sentences: reducers.analysisApiReducer.sentences,
  isLoading: reducers.analysisApiReducer.isAnalysisRequestLoading,
  reducerError: reducers.reducerError,
  selectedVariations: reducers.selectedVariations,
  selectedWords: reducers.selectedWords
});

const mapDispatchToProps = (dispatch: any) => ({
  analyseSentence: (index: number, sentence: string) => dispatch(ACTIONS.analyseSentence(index, sentence)),
  traingPOSTag: (sentencesWordsData: any[]) => dispatch(ACTIONS.traingPOSTag(sentencesWordsData)),
  predictPOSTag: (sentencesWordsData: any[]) => dispatch(ACTIONS.predictPOSTag(sentencesWordsData))
});

export default connect(mapStateToProps, mapDispatchToProps)(TextInputPanel);
