export default interface IApplicationAction {
  type: string,
  payload: { menuTagSelection?: string },
  error?: any
}
