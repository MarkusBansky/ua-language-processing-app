import IApplicationState from './states/IApplicationState'
import { MenuTabs } from '../pages/homepage/Homepage'
import IApplicationAction from './actions/IApplicationAction'
import ApplicationActionTypes from '../actions/types/ApplicationActionTypes'
import AnalysisActionTypes from '../actions/types/AnalysisApiTypes'
import produce from 'immer'

const applicationState: IApplicationState = {
  selectedMenuTab: MenuTabs.Input
}

function applicationStateReducer(initialState = applicationState, action: IApplicationAction) {
  switch (action.type) {
    /**
     * Triggered when setnences analysis API request finished successfully.
     */
    case AnalysisActionTypes.ANALYSE_SENTENCES_SUCCESS:
      return produce(initialState, draft => {
        draft.selectedMenuTab = MenuTabs.AnalysisResults
      })

    /**
     * An event used to change the menu tab.
     */
    case ApplicationActionTypes.SWITCH_MENU_TAB:
      return produce(initialState, draft => {
        draft.selectedMenuTab = action.payload.menuTagSelection as string
      })
    /**
     * In case the reducer does not have this action type.
     */
    default:
      return initialState
  }
}

export default applicationStateReducer
