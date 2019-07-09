import ACTIONS from "./action";
import { preprocessWords } from "../processors/WordPreprocessor";

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
      return {
        ...state,
        analysedWords: preprocessWords(action.payload.data),
        loading: false,
        elapsed: diff
      }

    case ACTIONS.Types.ANALYSE_SENTENCE_FAIL:
      return {
        ...state,
        loading: false
      }

    case ACTIONS.Types.TRAIN_TAGS:
      return { ...state, loading: true, time: new Date() };

    case ACTIONS.Types.TRAIN_TAGS_SUCCESS:
      const now2 = new Date()
      const diff2 = (now2 - state.time)

      console.log('Output:', action.payload.data)

      return { ...state, loading: false, elapsed: diff2 };

    case ACTIONS.Types.TRAIN_TAGS_FAIL:
      return {
        ...state,
        loading: false
      }

    case ACTIONS.Types.PREDICT_TAGS:
      return { ...state, loading: true, time: new Date() };

    case ACTIONS.Types.PREDICT_TAGS_SUCCESS:
      const now3 = new Date()
      const diff3 = (now3 - state.time)

      console.log('Output:', action.payload.data)

      return { ...state, loading: false, elapsed: diff3 };

    case ACTIONS.Types.PREDICT_TAGS_FAIL:
      return {
        ...state,
        loading: false
      }

    default:
      return state;
  }
};

export default todoReducer;
