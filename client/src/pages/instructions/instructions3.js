import React, { useState } from "react";
import { Button, Container, Divider } from "@mui/material/";
import { useHistory, useLocation } from "react-router-dom";
import { useRecoilValue } from "recoil";
import Tweet from "../../components/tweet/tweet";
import TweetQuote from "../../components/tweet/tweetQuote";
import { makeStyles } from "@mui/styles";
import pageHandler from "../pageHandler";
import CustomSlider from "../../components/slider/slider";
import {
  labelSelector,
  questionSelector,
  questionState,
} from "../../atoms/questionSelector";

const useStyles = makeStyles((theme) => ({
  emph: {
    fontWeight: "bold",
  },
  highlight: {
    fontWeight: "bold",
    color: "red",
  },
  instructContainer: {
    height: "100%",
    margin: "0 auto",
    overflow: "auto",
  },
  image: {
    width: "50%",
    display: "block",
    margin: "auto",
  },
}));

const InstructionsTask3 = (props) => {
  const history = useHistory();
  const location = useLocation();
  const classes = useStyles();

  const questionCondition = useRecoilValue(questionState);
  const getQuestion = useRecoilValue(questionSelector);
  const labels = useRecoilValue(labelSelector);

  const [tweetText, setTweetText] = useState(() => {
    return {
      claim: "",
      evidence: "",
      name: "Johnathan Nolander",
      handle: "",
      image: "",
    };
  });

  const question = getQuestion(tweetText);

  const handleConsent = () => {
    let nextPage = pageHandler(location.pathname);
    history.push(nextPage);
    // axios.get("/consent").then((result) => {
    //   //   console.log(result.data);

    // });
  };

  return (
    <Container maxWidth="md" className={classes.instructContainer}>
      <div
        style={{
          width: "70%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          margin: "0 auto",
        }}
      >
        <h3>
          Ok, now that we have established the goal of this study, here is how
          will ask for your judgements in this study:
        </h3>
        <p>
          We will use a <span className={classes.emph}>slider (see below)</span>{" "}
          to get your response. Please familiarize yourself with it. For each
          tweet, you would have to drag circular shape and move the slider
          around to the point that best represents your judgement.{" "}
        </p>
        <Divider></Divider>
        <br />
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
        <CustomSlider
          // style={{ width: "80%" }}
          labels={labels}
          domain={[0, 1]}
          question={question}
          handleResponse={console.log}
        ></CustomSlider>
      </div>
      <div
        style={{
          textAlign: "center",
          paddingTop: "10px",
          paddingBottom: "10px",
        }}
      >
        <Button
          // style={{ backgroundColor: "gray", color: "black" }}
          variant="contained"
          onClick={handleConsent}
        >
          Continue
        </Button>
      </div>
    </Container>
  );
};

export default InstructionsTask3;
