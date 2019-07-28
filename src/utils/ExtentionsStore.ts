import { createStore, applyMiddleware } from 'redux';

// Logger with default options
import logger from 'redux-logger';
import Axios from 'axios';
import axiosMiddleware from 'redux-axios-middleware';
import rootReducer from '../reducers/index';

const client = Axios.create({
  responseType: 'json'
});

export default function configureStore(history: any) {
  const createStoreWithMiddleware = applyMiddleware(logger, axiosMiddleware(client))(createStore);
  return createStoreWithMiddleware(rootReducer, history);
}
