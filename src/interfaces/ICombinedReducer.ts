import IAnalysisApiState from './IAnalysisApiState';
import IApplicationState from './IApplicationState';
import { IApiNeuralNetworkReducerState } from '../reducers/ApiNeuralNetworkReducer';

interface ICombinedReducer {
  analysisApiReducer: IAnalysisApiState
  applicationStateReducer: IApplicationState,
  apiNeuralNetworkReducer: IApiNeuralNetworkReducerState
}

export default ICombinedReducer;
