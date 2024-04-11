import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { Button, Divider, Typography, Container } from "@mui/material/";
import { useHistory, useLocation } from "react-router-dom";
import { makeStyles } from "@mui/styles";
import Tweet from "../../components/tweet/tweet";
import TweetQuote from "../../components/tweet/tweetQuote";
import pageHandler from "../pageHandler";

const messageFontSize = "min(1.3vw, 20px)";

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
  },
  grid: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    gap: "10px",
    paddingTop: "50px",
  },
  tweet: {
    // alignSelf: "center",
    width: "500px",
  },
  pointToTweetRight: {
    margin: 0,
    width: "300px",
    fontSize: messageFontSize,
    position: "absolute",
    right: ({ positions }) =>
      positions ? `${positions.tweet.right + 50}px` : "none",
    top: ({ positions }) => (positions ? `${positions.tweet.top}px` : "none"),
  },
  pointToTweetLeft: {
    margin: 0,
    width: "300px",
    fontSize: messageFontSize,
    position: "absolute",
    left: ({ positions }) =>
      positions ? `${positions.tweet.right + 50}px` : "none",
    top: ({ positions }) => (positions ? `${positions.tweet.top}px` : "none"),
  },
  pointToQuoteLeft: {
    margin: 0,
    width: "300px",
    fontSize: messageFontSize,
    position: "absolute",
    left: ({ positions }) =>
      positions ? `${positions.quote.right + 50}px` : "none",
    top: ({ positions }) => (positions ? `${positions.quote.top}px` : "none"),
  },
}));

const easinStyle = {
  transition: "opacity 2s ease-in",
  WebkitTransition: "opacity 0.3s",
  opacity: 1,
  display: "flex",
  flexDirection: "row",
};

const hiddenStyle = {
  opacity: 0,
};

const Instructions1 = (props) => {
  const tweetRef = useRef(null);
  const [positions, setPositions] = useState(null);
  const quoteRef = useRef(null);
  const location = useLocation();
  const [stage, setStage] = useState(-1);
  const maxStage = 4;
  const history = useHistory();
  const classes = useStyles({ positions: positions });
  const handleClick = () => {
    incrementStage();
  };

  const incrementStage = () => {
    setStage((prev) => prev + 1);
  };

  useEffect(() => {
    window.addEventListener("resize", setTweetPositions);
  }, []);

  const setTweetPositions = () => {
    let tweetParent = tweetRef.current;
    if (tweetParent == null) return;
    let tweet = tweetParent.querySelector(".tweetComponent");

    let quote = tweetParent.querySelector(".quoteComponent");

    let p = {
      quote: quote.getBoundingClientRect(),
      tweet: tweet.getBoundingClientRect(),
    };
    setPositions(p);
  };

  useEffect(() => {
    if (tweetRef.current != null) {
      setTweetPositions();
      window.addEventListener("resize", setTweetPositions);
    }
  }, [tweetRef, quoteRef]);

  useEffect(() => {
    console.log(positions);
  }, [positions]);

  useEffect(() => {
    console.log("stage", stage);
    if (stage === -1) {
      incrementStage();
    } else if (stage === maxStage) {
      let nextPage = pageHandler(location.pathname);
      history.push(nextPage);
    }
  }, [stage]);

  return (
    <Container maxWidth="xl" className={classes.instructContainer}>
      <div className={classes.grid}>
        <div
          className={classes.tweet}
          style={stage >= 0 ? easinStyle : hiddenStyle}
          ref={tweetRef}
        >
          <Tweet
            text={`Spielberg is one of the worst directors of the recent decade.`}
            accName={"Johnathan Nolander"}
            screen_name={"JNolander"}
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
        <div className={classes.pointToTweetRight}>
          <div style={stage == 0 ? easinStyle : hiddenStyle}>
            <span>
              {" "}
              We will ask you if you would{" "}
              <span className={classes.emph}>consider sharing</span> each post
              on social media. By social media, we mean
              platforms like Facebook, Twitter/X, TikTok, or even sending to friends in
              direct messages or group chats.
            </span>
          </div>
          <br />
        </div>

        <div className={classes.pointToTweetRight}>
          <div style={stage >= 1 ? easinStyle : hiddenStyle}>
            <span>
              For example: Would you consider sharing this post, 
              including the quoted headline?
            </span>
            <span>👉👉👉</span>
          </div>
        </div>

        <div className={classes.pointToTweetLeft}>
          <div style={stage >= 2 ? easinStyle : hiddenStyle}>
            <span>
              We understand that, in general, you might not share a lot on social
              media.
            </span>
          </div>
          <br />
          <div style={stage >= 3 ? easinStyle : hiddenStyle}>
            <span>
              Even if you don't share often, there may be some posts that you would 
              be more likely to share than others. When responding, please consider 
              how likely you would be to share the post compared to other content. 
            </span>
          </div>
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
            onClick={handleClick}
          >
            Continue
          </Button>
        </div>
      </div>
    </Container>
  );
};

export default Instructions1;
