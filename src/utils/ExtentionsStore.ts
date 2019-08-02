import { createStore, applyMiddleware } from 'redux';

// Logger with default options
import logger from 'redux-logger';
import Axios from 'axios';
import axiosMiddleware from 'redux-axios-middleware';
import { combineReducers } from 'redux';
import analysisApiReducer from '../reducers/AnalysisApiReducer';
import applicationStateReducer from '../reducers/ApplicationStateReducer';
import apiNeuralNetworkReducer from '../reducers/ApiNeuralNetworkReducer';

const client = Axios.create({
  responseType: 'json'
});

const rootReducer = combineReducers({
  analysisApiReducer,
  applicationStateReducer,
  apiNeuralNetworkReducer
})

export default function configureStore(history: any) {
  const createStoreWithMiddleware = applyMiddleware(logger, axiosMiddleware(client))(createStore);
  return createStoreWithMiddleware(rootReducer, history);
}
