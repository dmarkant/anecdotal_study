import { atom, selector } from "recoil";

export const questionState = atom({
  key: "questionState",
  default: "strength",
});

export const questionSelector = selector({
  key: "questionSelector",
  get: ({ get }) => {
    let questionCondition = get(questionState);
    let getQL;
    switch (questionCondition) {
      case "strength":
        getQL = (tweetText) => {
          return `To what extent does the quoted news headline support ${tweetText.name}'s claim?`;
        };
        return getQL;

        break;
      case "share":
        getQL = (tweetText) => {
          return `How likely are you to share ${tweetText.name}'s tweet on your social media profile (for example Twitter or Facebook)?`;
        };
        return getQL;
        break;
    }
  },
});

export const qualQuestionSelector = selector({
  key: "qualQuestionSelector",
  get: ({ get }) => {
    let questionCondition = get(questionState);
    let getQL;
    switch (questionCondition) {
      case "strength":
        getQL = (tweetText) => {
          return `You can see your response for "how strong the quoted news headline supports ${tweetText.name}'s claim?" below:`;
        };
        return getQL;

        break;
      case "share":
        getQL = (tweetText) => {
          return `You can see your response for "how likely are you to share ${tweetText.name}'s tweet on your social media platforms?" below:`;
        };
        return getQL;
        break;
    }
  },
});

export const labelSelector = selector({
  key: "labelQuestionSelector",
  get: ({ get }) => {
    let questionCondition = get(questionState);
    switch (questionCondition) {
      case "share":
        return [
          "Not likely at all",
          "Slightly likely",
          "Moderately Likely",
          "Completely likely",
        ];
        break;
      case "strength":
        return [
          "Does not support",
          "Slightly supports",
          "Moderately supports",
          "Strongly supports",
        ];
        break;
    }
  },
});

// export { questionState, questionSelector };
