// types of action
const Types = {
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
const analyseSentence = sentence => ({
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

const traingPOSTag = listOfTagRows => ({
  type: "TRAN_TAGS",
  payload: {
    request: {
      url: '/trainPOSTag',
      method: 'POST',
      data: listOfTagRows
    }
  }
});

const predictPOSTag = listOfTagRows => ({
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
  analyseSentence,
  traingPOSTag,
  predictPOSTag,
  Types
};
