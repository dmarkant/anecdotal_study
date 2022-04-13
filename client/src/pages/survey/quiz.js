import React from "react";
import { useHistory, useLocation } from "react-router-dom";
import pageHandler from "../pageHandler";
import axios from "axios";
import * as Survey from "survey-react";
import { Divider, Typography, Container } from "@mui/material";
import Tweet from "../../components/tweet/tweet";
import TweetQuote from "../../components/tweet/tweetQuote";
import { useRecoilValue } from "recoil";
import { questionState } from "../../atoms/questionSelector";
import "survey-react/survey.css";

const PreSurveyPage = (props) => {
  const history = useHistory();
  const location = useLocation();
  const questionCondition = useRecoilValue(questionState);
  console.log(questionCondition);
  const extraQuestions =
    questionCondition == "strength"
      ? [
          {
            name: "support",
            type: "radiogroup",
            title: `When I read: "Spielberg is one of the worst directors of the recent decade." I should:`,
            isRequired: true,
            choices: [
              "Evalute whether that's supported by the headline",
              "give my opinion whether that's true regardless of the headline",
              "I don't know",
            ],
          },

          {
            name: "headline_true",
            type: "radiogroup",
            title: `When I read: "Steven Spielberg's latest three movies were among the worst rated in Rotten Tomatoes." I should:`,
            isRequired: true,
            choices: [
              "Evaluate whether that statement is true.",
              "Assume that it's true.",
              "I don't know",
            ],
          },
        ]
      : [];

  const json = {
    elements: [
      {
        name: "claim",
        type: "radiogroup",
        title: `The tweet: "Spielberg is one of the worst directors of the recent decade." is ___`,
        isRequired: true,
        choices: ["a claim", "a news headline", "I don't know"],
      },
      {
        name: "headline",
        type: "radiogroup",
        title: `The tweet: "Steven Spielberg's latest three movies were among the worst rated in Rotten Tomatoes." is ___`,
        isRequired: true,
        choices: ["a claim", "a news headline", "I don't know"],
      },
      ...extraQuestions,
      {
        name: "understand",
        type: "radiogroup",
        title: "Do you understand what this study is asking you to do?",
        isRequired: true,
        choices: ["yes", "no"],
      },
      {
        name: "understand-text",
        type: "text",
        title: "Please describe what this study is asking you to do",
        isRequired: false,
      },
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
    axios.post("/api/quiz", survey.data).then((response) => {
      let nextPage = pageHandler(location.pathname);
      history.push(nextPage);
    });
  };
  //   console.log(props.setChoice);

  //   useEffect(() => {
  //     async function fetchData() {
  //       const result = await axios("/study/getData");
  //       // console.log(result.data);
  //       console.log(result.data);
  //     }

  //     fetchData();
  //   }, []);
  const model = new Survey.Model(json);
  model.showCompletedPage = false;
  return (
    <Container
      maxWidth={false}
      style={{
        width: "100%",
        overflow: "auto",
        height: "100%",
        paddingTop: "30px",
        paddingBottm: "30px",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Typography variant="h5">
          One last thing before we start, please respond to the following
          questions about our study!
        </Typography>
        <Divider></Divider>
        <div style={{ width: "50%", margin: "30px" }}>
          <Tweet
            text={`Spielberg is one of the worst directors of the recent decade.`}
            accName={"Johnatan Nolander"}
            screen_name={"JNolander"}
            style={{ width: "50%" }}
          >
            <TweetQuote
              text={
                "Steven Spielberg's latest three movies were among the worst rated in Rotten Tomatoes."
              }
              accName={"Sunny Hollywood News"}
              screen_name={"SunnyHollywood"}
              showImage={true}
              src={
                "https://upload.wikimedia.org/wikipedia/commons/thumb/c/ca/Steven_Spielberg_%2836057844341%29.jpg/800px-Steven_Spielberg_%2836057844341%29.jpg?20170801002525"
              }
            ></TweetQuote>
          </Tweet>
        </div>
      </div>
      <Divider></Divider>
      <Survey.Survey model={model} onComplete={onComplete} />
    </Container>
  );
};

export default PreSurveyPage;
