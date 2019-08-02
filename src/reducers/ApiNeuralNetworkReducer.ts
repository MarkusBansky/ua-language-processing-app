import produce from 'immer';
import ACTIONS from '../actions/ApiActions';
import Sentence from '../models/Sentence';
import { message } from 'antd';

export interface IApiNeuralNetworkReducerState {
  sentences: Sentence[]
  isLoading: boolean,
  reducerError: string
};

const defaultState: IApiNeuralNetworkReducerState = {
  sentences: [],
  isLoading: false,
  reducerError: ''
};

const apiNeuralNetworkReducer =
  (state: IApiNeuralNetworkReducerState = defaultState, action: { type: string, payload: any, error: any }) =>
    produce(state, draftState => {
  switch (action.type) {
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

export default apiNeuralNetworkReducer
