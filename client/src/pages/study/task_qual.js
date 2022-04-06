import React, { useState, useEffect, useRef } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { qualResponseState } from "../../atoms/qualResponseIndex";
import { responseState } from "../../atoms/response";
import { dataState } from "../../atoms/data";
import axios from "axios";
import AlertDialog from "../../components/dialog/alertDialog";
import InstructionsDialogQual from "../../components/instructions/instructionsDialogQual";
import Tweet from "../../components/tweet/tweet";
import TweetQuote from "../../components/tweet/tweetQuote";

import Instructions from "../../components/instructions/instructions";
import { useHistory, useLocation } from "react-router-dom";
import pageHandler from "../pageHandler";
import { Button, Divider, Typography } from "@mui/material/";
import CustomSlider from "../../components/slider/sliderFixed";
import QualResponse from "../../components/qualResponse/qualResponse";
import $ from "jquery";

const QualTask = (props) => {
  let minCharacterCount = 10;
  const allData = useRecoilValue(dataState);
  // console.log(allData);
  const data = allData !== null ? allData[0].concat(allData[1]) : null;
  const history = useHistory();
  const location = useLocation();

  const [labels, setLabels] = useState(() => [
    "Does not support",
    "Slightly supports",
    "Moderately supports",
    "Strongly supports",
  ]);

  const [tweetText, setTweetText] = useState(() => {
    return { claim: "", evidence: "", name: "", handle: "", image: "" };
  });

  const question = `In the previous task, your rating for ${tweetText.name}'s claim was:`;

  const [response, setResponse] = useRecoilState(responseState);
  const [qualResponse, setQualResponse] = useState(() => "");
  const [answerIndex, setAnswerIndex] = useRecoilState(qualResponseState);
  const [opacity, setOpacity] = useState(1);
  const [openInstructions, setOpenInstructions] = useState(false);

  const divContainer = useRef(null);
  const questionWidth = "50%";

  const submitResponse = async (r) => {
    // console.log(r);

    let responseCopy = { ...response };
    responseCopy[answerIndex] = { ...responseCopy[answerIndex] };
    responseCopy[answerIndex]["qualResponse"] = qualResponse;
    setResponse(responseCopy);
  };

  const handleOpenInstructions = () => {
    setOpenInstructions(true);
  };

  const handleCloseInstructions = (value) => {
    setOpenInstructions(false);
  };

  const handleAddMoreClick = async () => {
    await submitResponse(qualResponse);
    setQualResponse("");
    loading();
    scrollTopTop();
    setAnswerIndex(() => {
      return answerIndex + 1;
    });
  };

  useEffect(() => {
    console.log(response);
  }, [response]);

  const scrollToBottom = () => {
    if (divContainer.current) {
      $(divContainer.current).animate(
        { scrollTop: divContainer.current.scrollHeight },
        500
      );
    }
  };

  const scrollTopTop = () => {
    if (divContainer.current) {
      $(divContainer.current).animate({ scrollTop: 0 }, 10);
    }
  };

  function loading() {
    props.setLoadingOpacity(1);
    setOpacity(0);
    setTimeout(() => {
      props.setLoadingOpacity(0);
      setOpacity(1);
    }, 600);
  }

  useEffect(() => {
    handleOpenInstructions();
    // console.log(data);
  }, []);

  useEffect(() => {
    // console.log(answerIndex);
    // console.log(phaseData);
    if (data !== null) {
      if (answerIndex < data.length) {
        console.log(answerIndex);
        console.log(response);
        let name =
          Object.keys(response).length > 0
            ? response[answerIndex]["name"]
            : "Alireza Karduni";
        let nameSplit = name.split(" ");
        let handle = nameSplit[0][0].toLowerCase() + nameSplit[1].toLowerCase();
        setTweetText({
          evidence: data[answerIndex]["evidence"],
          claim: data[answerIndex].claim,
          image: data[answerIndex].image,
          accName: "City News Today",
          screen_name: "CityNews",
          name: name,
          handle: handle,
        });
        // setTweetText({
        //   evidence: d["evidence"],
        //   claim: d.claim,
        //   image: d.image,
        //   accName: "City News Today",
        //   screen_name: "CityNews",
        //   name: name,
        //   handle: handle,
        // });
      } else {
        axios.post("/api/response", response).then((r) => {
          // history.push("/debrief");
          let nextPage = pageHandler(location.pathname);
          history.push(nextPage);
        });

        // if (props.phase === 0) {
        //   setAnswerIndex(0);
        //   history.push("cogref");
        // } else {
        // }
      }
    }
  }, [answerIndex]);

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        margin: "0 auto",
        overflow: "auto",
        paddingTop: "30px",
        paddingBottm: "30px",
        opacity: opacity,
      }}
      ref={divContainer}
    >
      <Instructions>
        <Typography variant="h5" align="center">
          Tweet {answerIndex + 1}/{data ? data.length : 18}
        </Typography>
      </Instructions>
      <Divider></Divider>
      <div
        style={{
          width: questionWidth,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          margin: "0 auto",
        }}
      >
        {" "}
        <Tweet
          text={`${tweetText.claim}`}
          accName={tweetText.name}
          screen_name={tweetText.handle}
        >
          <TweetQuote
            text={tweetText.evidence}
            accName="City News Today"
            screen_name="City News"
            showImage={true}
            src={tweetText.image}
          ></TweetQuote>
        </Tweet>
        <CustomSlider
          labels={labels}
          domain={[0, 1]}
          question={question}
          // handleResponse={handleSliderResponse}
          value={response[answerIndex] ? response[answerIndex]["value"] : 0.5}
        ></CustomSlider>
        <QualResponse
          setQualResponse={setQualResponse}
          qualResponse={qualResponse}
        ></QualResponse>
      </div>
      <Divider></Divider>

      <div
        style={{
          textAlign: "center",
          paddingTop: "10px",
          paddingBottom: "10px",
        }}
      >
        <Button
          style={{
            marginRight: "10px",
          }}
          disabled={qualResponse.length <= minCharacterCount}
          color="primary"
          variant="contained"
          onClick={handleAddMoreClick}
        >
          Next!
        </Button>
      </div>

      <InstructionsDialogQual
        open={openInstructions}
        onClose={handleCloseInstructions}
      ></InstructionsDialogQual>
    </div>
  );
};

export default QualTask;
