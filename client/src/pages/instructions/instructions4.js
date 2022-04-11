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
          Thanks for going through all of the tweets. You're almost there. Now
          we will show you all the responses you have made. We ask you to
          describe to the best of your ability, why you made your judgements.
          Any reason is fine, as long as there is one.:
        </h3>
        <p>
          We will show you the tweet, the judgement you made using a slider that
          is fixed, and you will enter your responses into the text box.
        </p>
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
