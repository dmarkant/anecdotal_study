import React from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import * as Survey from "survey-react";
import "survey-react/survey.css";

Survey.StylesManager.applyTheme("orange");

const PostSurveyPage = (props) => {
  const history = useHistory();
  const json = {
    elements: [
      {
        type: "radiogroup",
        name: "economic",
        title:
          "How would you describe your political outlook with regard to economic issues?",
        isRequired: true,
        colCount: 5,
        choices: [
          "Very liberal",
          "Slightly liberal",
          "Moderate",
          "Slightly Conservative",
          "Very Consertavite",
        ],
      },
      {
        type: "radiogroup",
        name: "social",
        title:
          "How would you describe your political outlook with regard to social issues?",
        isRequired: true,
        colCount: 5,
        choices: [
          "Very liberal",
          "Slightly liberal",
          "Moderate",
          "Slightly Conservative",
          "Very Consertavite",
        ],
      },
      {
        type: "radiogroup",
        name: "mask_attitude",
        title:
          "To what extent are you in favor or against wearing masks during covid?",
        isRequired: true,
        colCount: 5,
        choices: [
          "Extremely against",
          "Moderately against",
          "Neutral",
          "Moderately in favor",
          "Extremely in favor",
        ],
      },
      {
        type: "radiogroup",
        name: "hydroxi_attitude",
        title:
          "To what extent are you in favor or against medicine such as Hydroxychloroquine as a treatment for covid?",
        isRequired: true,
        colCount: 5,
        choices: [
          "Extremely against",
          "Moderately against",
          "Neutral",
          "Moderately in favor",
          "Extremely in favor",
        ],
      },
      {
        type: "radiogroup",
        name: "bernie_attitude",
        title:
          "To what extent are you in favor or against Bernie Sanders and his ideas?",
        isRequired: true,
        colCount: 5,
        choices: [
          "Extremely against",
          "Moderately against",
          "Neutral",
          "Moderately in favor",
          "Extremely in favor",
        ],
      },
      {
        type: "radiogroup",
        name: "guncontrol_attitude",
        title:
          "To what extent are you in favor or against gun control in the United States?",
        isRequired: true,
        colCount: 5,
        choices: [
          "Extremely against",
          "Moderately against",
          "Neutral",
          "Moderately in favor",
          "Extremely in favor",
        ],
      },
      {
        type: "radiogroup",
        name: "vaping_attitude",
        title:
          "To what extent are you in favor or against using vaping products?",
        isRequired: true,
        colCount: 5,
        choices: [
          "Extremely against",
          "Moderately against",
          "Neutral",
          "Moderately in favor",
          "Extremely in favor",
        ],
      },
      {
        type: "radiogroup",
        name: "crypto_attitude",
        title: "To what extent are you in favor or against cryptocurrencies?",
        isRequired: true,
        colCount: 5,
        choices: [
          "Extremely against",
          "Moderately against",
          "Neutral",
          "Moderately in favor",
          "Extremely in favor",
        ],
      },

      // ,
      // {
      //   type: "comment",
      //   name: "attention1",
      //   title:
      //     'Imagine you found yourself in the following situation: "On the morning of an important job interview, you wake up with fever and chills." \n What is a potential course of action that you could take in this situation?',
      //   isRequired: true,
      // },
      // {
      //   type: "comment",
      //   name: "attention2",
      //   title:
      //     'Imagine you found yourself in the following situation: "You stop by a store to grab an item you need. You are in a hurry but the cashier is nowhere to be found.". \n What is a potential course of action that you could take in this situation?',
      //   isRequired: true,
      // },
    ],
  };
  var defaultThemeColors = Survey.StylesManager.ThemeColors["default"];
  defaultThemeColors["$main-color"] = "black";
  defaultThemeColors["$main-hover-color"] = "lightgrey";
  defaultThemeColors["$text-color"] = "#4a4a4a";
  defaultThemeColors["$header-color"] = "#7ff07f";

  defaultThemeColors["$header-background-color"] = "#4a4a4a";
  defaultThemeColors["$body-container-background-color"] = "#f8f8f8";

  Survey.StylesManager.applyTheme();

  const onComplete = (survey, options) => {
    //Write survey results into database
    console.log("Survey results: " + JSON.stringify(survey.data));
    axios.post("/api/postq", survey.data).then((response) => {
      console.log(response);
      history.push("/debrief");
    });
  };

  const model = new Survey.Model(json);
  model.showCompletedPage = false;
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        margin: "0 auto",
        overflow: "auto",
        paddingTop: "30px",
        paddingBottm: "30px",
      }}
    >
      <Survey.Survey model={model} onComplete={onComplete} />
    </div>
  );
};

export default PostSurveyPage;
