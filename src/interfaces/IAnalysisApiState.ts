import Sentence from '../models/Sentence';

export default interface IAnalysisApiState {
  sentences: Sentence[],
  isAnalysisRequestLoading: boolean
}
