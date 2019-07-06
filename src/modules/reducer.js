import ACTIONS from "./action";

const defaultState = {
  analysedWords: [],
  loading: false
};

const todoReducer = (state = defaultState, action) => {
  switch (action.type) {
    case ACTIONS.Types.ANALYSE_SENTENCE:
      console.log('REQUESTING...')
      return { ...state, loading: true };

    case ACTIONS.Types.ANALYSE_SENTENCE_SUCCESS:
      console.log('SUCCESS:', action);
      return {...state, analysedWords: action.payload.data, loading: false}

    case ACTIONS.Types.ANALYSE_SENTENCE_FAIL:
      return {...state, loading: false}

    default:
      return state;
  }
};

export default todoReducer;
