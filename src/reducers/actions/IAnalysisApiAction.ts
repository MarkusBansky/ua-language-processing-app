export default interface IAnalysisApiAction {
  type: string,
  payload: { url: string, method: string, data: any },
  error?: any
}
