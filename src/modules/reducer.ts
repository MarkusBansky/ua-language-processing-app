import ACTIONS from "./action"
import { getSentenceFromArray } from "../processors/WordPreprocessor"
import Sentence from '../processors/parts/Sentence';

export interface ReducerState {
  selectedVariations: any
  sentences: Sentence[]
  isLoading: boolean,
  reducerError: string
}

const defaultState: ReducerState = {
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
    case ACTIONS.Types.CHANGE_VARIATION_SELECTION:
      let sv = state.selectedVariations
      sv[action.payload.wordId] = action.payload.variationId
      return { ...state, selectedVariations: sv }

    case ACTIONS.Types.ANALYSE_SENTENCE:
      return { ...state, isLoading: true };

    case ACTIONS.Types.ANALYSE_SENTENCE_SUCCESS:
      // const parsedSentences = action.payload.data
      //   .map((d: any, i: number) => getSentenceFromArray(d, i))
      const parsedSentences = [getSentenceFromArray(action.payload.data, 0)]
      return { ...state, sentences: parsedSentences, isLoading: false }

    case ACTIONS.Types.ANALYSE_SENTENCE_FAIL:
      return { ...state, isLoading: false, reducerError: action.payload.data }

    case ACTIONS.Types.TRAIN_TAGS:
      return { ...state, isLoading: true }

    case ACTIONS.Types.TRAIN_TAGS_SUCCESS:
      return { ...state, isLoading: false }

    case ACTIONS.Types.TRAIN_TAGS_FAIL:
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
