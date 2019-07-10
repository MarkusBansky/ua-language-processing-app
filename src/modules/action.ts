// types of action
const Types = {
  CHANGE_VARIATION_SELECTION: "CHANGE_VARIATION_SELECTION",
  ANALYSE_SENTENCE: "ANALYSE_SENTENCE",
  ANALYSE_SENTENCE_SUCCESS: "ANALYSE_SENTENCE_SUCCESS",
  ANALYSE_SENTENCE_FAIL: "ANALYSE_SENTENCE_FAIL",
  TRAIN_TAGS: "TRAIN_TAGS",
  TRAIN_TAGS_SUCCESS: "TRAIN_TAGS_SUCCESS",
  TRAIN_TAGS_FAIL: "TRAIN_TAGS_FAIL",
  PREDICT_TAGS: "PREDICT_TAGS",
  PREDICT_TAGS_SUCCESS: "PREDICT_TAGS_SUCCESS",
  PREDICT_TAGS_FAIL: "PREDICT_TAGS_FAIL",
};

// actions
const analyseSentence = (sentence: string) => ({
  type: 'ANALYSE_SENTENCE',
  payload: {
    request: {
      url: '/analyse',
      method: 'POST',
      data: {
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

const traingPOSTag = (listOfTagRows: any[]) => ({
  type: "TRAN_TAGS",
  payload: {
    request: {
      url: '/trainPOSTag',
      method: 'POST',
      data: listOfTagRows
    }
  }
});

const predictPOSTag = (listOfTagRows: any[]) => ({
  type: "PREDICT_TAGS",
  payload: {
    request: {
      url: '/predictPOSTag',
      method: 'POST',
      data: listOfTagRows
    }
  }
});

export default {
  selectVariationForWord,
  analyseSentence,
  traingPOSTag,
  predictPOSTag,
  Types
};
