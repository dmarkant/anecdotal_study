import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button, Container } from "@mui/material/";
import { makeStyles } from "@mui/styles";
import { useHistory, useLocation } from "react-router-dom";
import queryString from "query-string";
import pageHandler from "../pageHandler";

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

const Consent = (props) => {
  // ?PROLIFIC_PID={{%PROLIFIC_PID%}}&STUDY_ID={{%STUDY_ID%}}&SESSION_ID={{%SESSION_ID%}}
  const PROLIFIC_PID = props.PROLIFIC_PID;
  const STUDY_ID = props.STUDY_ID;
  const SESSION_ID = props.SESSION_ID;
  console.log(PROLIFIC_PID);
  console.log(SESSION_ID);
  console.log(STUDY_ID);
  const d = new Date();
  const history = useHistory();
  const location = useLocation();
  const query = queryString.parse(location.search);

  const handleConsent = () => {
    axios
      .get(
        `/api/consent?PROLIFIC_PID=${PROLIFIC_PID}&STUDY_ID=${STUDY_ID}&SESSION_ID=${SESSION_ID}`
      )
      .then((result) => {
        console.log(result);
        let nextPage = pageHandler(location.pathname);
        history.push(nextPage);
      });
  };
  const classes = useStyles();
  const [overflow, setOverflow] = useState(true);

  useEffect(() => {
    window.addEventListener("beforeprint", () => {
      // setOverflow(false);
      document.querySelector("#scrollWrapper").style.overflow = "visible";
    });
    window.addEventListener("afterprint", () => {
      document.querySelector("#scrollWrapper").style.overflow = "scroll";
    });
  }, []);

  return (
    <Container
      maxWidth="xl"
      // style={{ overflow: overflow }}
      className={classes.instructContainer}
      id="consent-container"
    >
      <div></div>
      <p>Now it's time to start the next section of the study.</p>

      <hr />
      <div
        style={{
          textAlign: "center",
          paddingTop: "10px",
          paddingBottom: "10px",
        }}
      >
        <Button
          // style={{ backgroundColor: "darkgrey", color: "black" }}
          variant="contained"
          onClick={handleConsent}
        >
          I'm ready to start
        </Button>
      </div>
    </Container>
  );
};

export default Consent;
