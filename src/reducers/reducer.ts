import produce from 'immer';
import ACTIONS from '../actions/ApiActions';
import Sentence from '../models/Sentence';
import { message } from 'antd';

export interface ReducerState {
  selectedWords: string[],
  selectedVariations: any
  sentences: Sentence[]
  isLoading: boolean,
  reducerError: string
};

const defaultState: ReducerState = {
  selectedWords: [],
  selectedVariations: {},
  sentences: [],
  isLoading: false,
  reducerError: ''
};

const reducer =
  (state: ReducerState = defaultState, action: { type: string, payload: any, error: any }) =>
    produce(state, draftState => {
  switch (action.type) {
    /**
     * This is triggered when user clicks on the word to select it.
     */
    case ACTIONS.Types.TOGGLE_WORD_FOR_TRAINING:
      let selectedToggleWord = draftState.selectedWords
        .find(w => w === action.payload.wordId);

      if (selectedToggleWord) {
        draftState.selectedWords = draftState.selectedWords
          .filter(w => w !== action.payload.wordId);
      } else {
        draftState.selectedWords.push(action.payload.wordId);
      }
      break;

    /**
     * This is triggered when user is changing the variation in the dropdown.
     */
    case ACTIONS.Types.CHANGE_VARIATION_SELECTION:
      draftState.selectedVariations[action.payload.wordId] = action.payload.variationId;

      let selectedVariationWord = draftState.selectedWords
        .find(w => w === action.payload.wordId);

      if (!selectedVariationWord) {
        draftState.selectedWords
          .push(action.payload.wordId);
      }
      break;


    /**
     * This part stands dor TRAINING requests in the API
     * of the neural network.
     */
    case ACTIONS.Types.TRAIN_TAGS:
      draftState.isLoading = true;
      break;
    case ACTIONS.Types.TRAIN_TAGS_SUCCESS:
      draftState.isLoading = false;
      break;
    case ACTIONS.Types.TRAIN_TAGS_FAIL:
      message.error('An error occured while trying to send train request to the server.');
      draftState.isLoading = false;
      draftState.reducerError = action.error;
      break;

    /**
     * This part of the reduceers stands for PREDICTION requests for the API
     * of neural network in the ua nlp service.
     */
    case ACTIONS.Types.PREDICT_TAGS:
      draftState.isLoading = true;
      break;

    case ACTIONS.Types.PREDICT_TAGS_SUCCESS:
      for (var i = 0; i < action.payload.data.length; i++) {
        console.log(action.payload.data[i]);
      }
      draftState.isLoading = false;
      break;

    case ACTIONS.Types.PREDICT_TAGS_FAIL:
      message.error('An error occured while trying to send train request to the server.');
      draftState.isLoading = false;
      draftState.reducerError = action.error;
      break;
  }
})

export default reducer
