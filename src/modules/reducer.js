import ACTIONS from "./action";

const defaultState = {
  analysedWords: [],
  loading: false
};

const todoReducer = (state = defaultState, action) => {
  switch (action.type) {
    case ACTIONS.Types.ANALYSE_SENTENCE:
      return { ...state, loading: true, time: new Date() };

    case ACTIONS.Types.ANALYSE_SENTENCE_SUCCESS:
      const now = new Date()
      const diff = (now - state.time)
      return {...state, analysedWords: action.payload.data, loading: false, elapsed: diff}

    case ACTIONS.Types.ANALYSE_SENTENCE_FAIL:
      return {...state, loading: false}

    default:
      return state;
  }
};

export default todoReducer;
