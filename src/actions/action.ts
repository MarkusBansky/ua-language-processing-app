import { NEURAL_API, DICTIONARY_API } from '../App'

// types of action
const Types = {
  TOGGLE_WORD_FOR_TRAINING: "TOGGLE_WORD_FOR_TRAINING",
  CHANGE_VARIATION_SELECTION: "CHANGE_VARIATION_SELECTION",
  ANALYSE_SENTENCES: "ANALYSE_SENTENCES",
  ANALYSE_SENTENCES_SUCCESS: "ANALYSE_SENTENCES_SUCCESS",
  ANALYSE_SENTENCES_FAIL: "ANALYSE_SENTENCES_FAIL",
  TRAIN_TAGS: "TRAIN_TAGS",
  TRAIN_TAGS_SUCCESS: "TRAIN_TAGS_SUCCESS",
  TRAIN_TAGS_FAIL: "TRAIN_TAGS_FAIL",
  PREDICT_TAGS: "PREDICT_TAGS",
  PREDICT_TAGS_SUCCESS: "PREDICT_TAGS_SUCCESS",
  PREDICT_TAGS_FAIL: "PREDICT_TAGS_FAIL",
};

// actions
const analyseSentence = (index: number, sentence: string) => ({
  type: 'ANALYSE_SENTENCES',
  payload: {
    request: {
      url: DICTIONARY_API + '/analyse',
      method: 'POST',
      data: {
        index,
        sentence
      }
    }
  }
});

const selectVariationForWord = (wordId: string, variationId: string) => ({
  type: Types.CHANGE_VARIATION_SELECTION,
  payload: {
    wordId,
    variationId
  }
})

const toggleWordForTraining = (wordId: string) => ({
  type: Types.TOGGLE_WORD_FOR_TRAINING,
  payload: {
    wordId
  }
})

const traingPOSTag = (sentencesWordsData: any[]) => ({
  type: "TRAN_TAGS",
  payload: {
    request: {
      url: NEURAL_API + '/grammar/train',
      method: 'POST',
      data: sentencesWordsData
    }
  }
});

const predictPOSTag = (sentencesWordsData: any[]) => ({
  type: "PREDICT_TAGS",
  payload: {
    request: {
      url: NEURAL_API + '/grammar/predict',
      method: 'POST',
      data: sentencesWordsData
    }
  }
});

export default {
  toggleWordForTraining,
  selectVariationForWord,
  analyseSentence,
  traingPOSTag,
  predictPOSTag,
  Types
};
