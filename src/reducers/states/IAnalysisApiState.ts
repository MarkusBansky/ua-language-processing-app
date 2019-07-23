import Sentence from '../../processors/parts/Sentence';

export default interface IAnalysisApiState {
  sentences: Sentence[],
  isAnalysisRequestLoading: boolean
}
