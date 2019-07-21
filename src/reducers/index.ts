import reducer from './reducer'
import { combineReducers } from "redux"
import analysisApiReducer from './AnalysisApiReducer'
import applicationStateReducer from './ApplicationStateReducer'

const rootReducer = combineReducers({
  analysisApiReducer,
  applicationStateReducer,
  reducer
})

export default rootReducer
