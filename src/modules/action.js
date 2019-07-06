// types of action
const Types = {
  ANALYSE_SENTENCE: "ANALYSE_SENTENCE",
  ANALYSE_SENTENCE_SUCCESS: "ANALYSE_SENTENCE_SUCCESS",
  ANALYSE_SENTENCE_FAIL: "ANALYSE_SENTENCE_FAIL",
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

export default {
  analyseSentence,
  Types
};
