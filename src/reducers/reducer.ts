import produce from 'immer'
import ACTIONS from '../actions/action'
import Sentence from '../processors/parts/Sentence'
import { message } from 'antd'

export interface ReducerState {
  selectedWords: string[],
  selectedVariations: any
  sentences: Sentence[]
  isLoading: boolean,
  reducerError: string
}

const defaultState: ReducerState = {
  selectedWords: [],
  selectedVariations: {},
  sentences: [],
  isLoading: false,
  reducerError: ''
};

const reducer = (
  state: ReducerState = defaultState,
  action: { type: string, payload: any, error: any }
) => {
  switch (action.type) {
    case ACTIONS.Types.TOGGLE_WORD_FOR_TRAINING:
      const nextState = produce(state, draftState => {
        let wordWasSelected = draftState.selectedWords
          .find(w => w === action.payload.wordId)

        if (wordWasSelected) {
          draftState.selectedWords = draftState.selectedWords
            .filter(w => w !== action.payload.wordId)
        } else {
          draftState.selectedWords.push(action.payload.wordId)
        }
      })

      return nextState

    case ACTIONS.Types.CHANGE_VARIATION_SELECTION:
      const changedVariationState = produce(state, draftState => {
        draftState.selectedVariations[action.payload.wordId] = action.payload.variationId

        let wordWasSelected = draftState.selectedWords
          .find(w => w === action.payload.wordId)

        if (!wordWasSelected) {
          draftState.selectedWords.push(action.payload.wordId)
        }
      })

      return changedVariationState



    case ACTIONS.Types.TRAIN_TAGS:
      return { ...state, isLoading: true }

    case ACTIONS.Types.TRAIN_TAGS_SUCCESS:
      return { ...state, isLoading: false }

    case ACTIONS.Types.TRAIN_TAGS_FAIL:
      message.error('An error occured while trying to send train request to the server.');
      return { ...state, isLoading: false, reducerError: action.error }

    case ACTIONS.Types.PREDICT_TAGS:
      return { ...state, isLoading: true }

    case ACTIONS.Types.PREDICT_TAGS_SUCCESS:
      for (var i = 0; i < action.payload.data.length; i++) {
        console.log(action.payload.data[i])
      }
      return { ...state, isLoading: false }

    case ACTIONS.Types.PREDICT_TAGS_FAIL:
      message.error('An error occured while trying to send train request to the server.');
      return { ...state, isLoading: false, reducerError: action.error }

    default:
      return state
  }
}

export default reducer
