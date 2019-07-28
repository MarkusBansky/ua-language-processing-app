import produce from 'immer'
import { message } from 'antd'
import ACTIONS from '../actions/ApiActions'
import IAnalysisApiState from '../interfaces/IAnalysisApiState'
import IAnalysisApiAction from '../interfaces/IAnalysisApiAction'
import { getSentenceFromArray } from '../utils/ExtentionsSentence'

const initialState: IAnalysisApiState = {
  sentences: [],
  isAnalysisRequestLoading: false
}

function analysisApiReducer(state = initialState, action: IAnalysisApiAction) {
  switch (action.type) {
    /**
     * Performs after the Analyse request was called
     */
    case ACTIONS.Types.ANALYSE_SENTENCES:
      // Clear the sentences arra and set loading to true
      return { ...state, sentences: [], isAnalysisRequestLoading: true }

    /**
     * Performs after the Analyse request finished successfully
     */
    case ACTIONS.Types.ANALYSE_SENTENCES_SUCCESS:
      // Get the sentence from request
      const parsedSentence = getSentenceFromArray(action.payload.data)

      // Write re sentence into the state
      const newStateWithSentences = produce(state, draftState => {
        draftState.isAnalysisRequestLoading = false
        draftState.sentences[parsedSentence.sentenceId] = parsedSentence
      })

      // console.log(newStateWithSentences)
      message.success('Your text was successfully analysed!')
      return newStateWithSentences

    /**
     * Fires when an error was found during the request
     */
    case ACTIONS.Types.ANALYSE_SENTENCES_FAIL:
      message.error('Some error occured during analysis of the sentence.')
      return { ...state, isAnalysisRequestLoading: false }

    /**
     * A default return
     */
    default:
      return state
  }
}

export default analysisApiReducer
