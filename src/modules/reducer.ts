import produce from 'immer'
import ACTIONS from "./action"
import { getSentenceFromArray } from "../processors/WordPreprocessor"
import Sentence from '../processors/parts/Sentence';
import { message } from 'antd';

export interface ReducerState {
  selectedWords: any,
  selectedVariations: any
  sentences: Sentence[]
  isLoading: boolean,
  reducerError: string
}

const defaultState: ReducerState = {
  selectedWords: {},
  selectedVariations: {},
  sentences: [],
  isLoading: false,
  reducerError: null
};

const reducer = (
  state: ReducerState = defaultState,
  action: { type: string, payload: any }
) => {
  switch (action.type) {
    case ACTIONS.Types.TOGGLE_WORD_FOR_TRAINING:
      const nextState = produce(state, draftState => {
        let prevValue: number = draftState.selectedWords[action.payload.wordId]
          ? draftState.selectedWords[action.payload.wordId]
          : false

        if (prevValue) delete draftState.selectedWords[action.payload.wordId]
        else draftState.selectedWords[action.payload.wordId] = !prevValue
      })


      console.log(nextState)
      return nextState

    case ACTIONS.Types.CHANGE_VARIATION_SELECTION:
      let sv = state.selectedVariations
      sv[action.payload.wordId] = action.payload.variationId
      return { ...state, selectedVariations: sv }

    case ACTIONS.Types.ANALYSE_SENTENCES:
      return { ...state, sentences: [], isLoading: true };

    case ACTIONS.Types.ANALYSE_SENTENCES_SUCCESS:
      // const parsedSentences = action.payload.data
      //   .map((d: any, i: number) => getSentenceFromArray(d, i))
      const parsedSentence = getSentenceFromArray(action.payload.data)
      const newStateWithSentences = produce(state, draftState => {
        draftState.isLoading = false
        draftState.sentences[parsedSentence.sentenceId] = parsedSentence
      })
      return newStateWithSentences

    case ACTIONS.Types.ANALYSE_SENTENCES_FAIL:
      message.error('Some error occured during analysis of the sentence.');
      return { ...state, isLoading: false, reducerError: action.payload.data }

    case ACTIONS.Types.TRAIN_TAGS:
      return { ...state, isLoading: true }

    case ACTIONS.Types.TRAIN_TAGS_SUCCESS:
      return { ...state, isLoading: false }

    case ACTIONS.Types.TRAIN_TAGS_FAIL:
      message.error('An error occured while trying to send train request to the server.');
      return { ...state, isLoading: false, reducerError: action.payload.data }

    case ACTIONS.Types.PREDICT_TAGS:
      return { ...state, isLoading: true }

    case ACTIONS.Types.PREDICT_TAGS_SUCCESS:
      return { ...state, isLoading: false }

    case ACTIONS.Types.PREDICT_TAGS_FAIL:
      return { ...state, isLoading: false, reducerError: action.payload.data }

    default:
      return state
  }
}

export default reducer
