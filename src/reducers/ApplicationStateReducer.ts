import IApplicationState from '../interfaces/IApplicationState';
import { MenuTabs } from '../pages/homepage/Homepage';
import IApplicationAction from '../interfaces/IApplicationAction';
import ApplicationActionTypes from '../types/ApplicationActionTypes';
import AnalysisActionTypes from '../types/AnalysisApiTypes';
import produce from 'immer';
import ApiActions from '../actions/ApiActions';

export const applicationState: IApplicationState = {
  selectedMenuTab: MenuTabs.Input,
  selectedWords: [],
  selectedVariations: []
};

const applicationStateReducer = (initialState = applicationState, action: IApplicationAction) => produce(initialState, draftState => {
  switch (action.type) {
    /**
     * This is triggered when user clicks on the word to select it.
     */
    case ApiActions.Types.TOGGLE_WORD_FOR_TRAINING:
      let selectedToggleWord = draftState.selectedWords
        .find(w => w === action.payload.wordId);

      if (selectedToggleWord) {
        draftState.selectedWords = draftState.selectedWords
          .filter(w => w !== action.payload.wordId);
      } else {
        draftState.selectedWords.push(action.payload.wordId!);
      }
      break;

    /**
     * This is triggered when user is changing the variation in the dropdown.
     */
    case ApiActions.Types.CHANGE_VARIATION_SELECTION:
      draftState.selectedVariations[action.payload.wordId!] = action.payload.variationId;

      let selectedVariationWord = draftState.selectedWords
        .find(w => w === action.payload.wordId);

      if (!selectedVariationWord) {
        draftState.selectedWords
          .push(action.payload.wordId!);
      }
      break;
    /**
     * Triggered when setnences analysis API request finished successfully.
     */
    case AnalysisActionTypes.ANALYSE_SENTENCES_SUCCESS:
      draftState.selectedMenuTab = MenuTabs.AnalysisResults
      break;
    /**
     * An event used to change the menu tab.
     */
    case ApplicationActionTypes.SWITCH_MENU_TAB:
      draftState.selectedMenuTab = action.payload.menuTagSelection as string
      break;
  }
});

export default applicationStateReducer
