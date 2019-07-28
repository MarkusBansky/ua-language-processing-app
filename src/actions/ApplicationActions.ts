import ApplicationActionTypes from '../types/ApplicationActionTypes'

export const switchTabs = (tab: string) => ({
  type: ApplicationActionTypes.SWITCH_MENU_TAB,
  payload: {
    menuTagSelection: tab
  }
})
