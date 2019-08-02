export default interface IApplicationAction {
  type: string,
  payload: {
    menuTagSelection?: string,
    wordId?: string,
    variationId?: string
  },
  error?: any
}
