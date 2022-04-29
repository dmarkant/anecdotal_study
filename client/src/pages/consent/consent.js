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
      setOverflow(false);
    });
    window.addEventListener("afterprint", () => {
      setOverflow(true);
    });
  }, []);

  return (
    <Container
      maxWidth="xl"
      className={classes.instructContainer}
      id="consent-container"
    >
      <div>
        {/* <img
          src={process.env.PUBLIC_URL + "/university.png"}
          height="120px"
        ></img> */}
      </div>
      <h1>Consent to Participate in Online Research</h1>
      <h2>Title of Research Study:</h2>
      <p>Reasoning with Evidence on Social Media</p>
      <h2>Principal Investigator</h2>
      <p>Dr. Steven Franconeri</p>

      <h2>Key Information about this research study:</h2>
      <p>
        The following is a short summary of this study to help you decide
        whether to be a part of this study. Information that is more detailed is
        listed later on in this form. The purpose of this study is to test how
        participants reason with the evidence presented in the form of news
        headlines on social media. Additionally, we will assess whether certain
        interventions in the form of explanations reduce users’ reliance on weak
        evidence. You will be asked to read sentences on a screen, and asked
        questions about what you read. We expect that you will be in this
        research study for between 20 and 30 minutes. Your participation in this
        study does not involve any risks other than what you would encounter in
        daily life. You are not likely to have any direct benefit from being in
        this research study. The potential benefits to you from participation
        may include learning about how psychological research is conducted, and
        you may learn about issues of current interest in psychology.{" "}
      </p>

      <h2>Why am I being asked to take part in this research study?</h2>
      <p>
        We are asking you to take part in this research study because you are 18
        years or older and are an English speaker living in the United States.
      </p>

      <h2>How many people will be in this study?</h2>
      <p>We expect no more than 1000 people will be in this research study.</p>

      <h2>What should I know about participating in a research study?</h2>
      <ul>
        <li>Whether or not you take part is up to you.</li>
        <li>You can choose not to take part.</li>
        <li>You can agree to take part and later change your mind.</li>
        <li>Your decision will not be held against you.</li>
      </ul>
      <h2>What happens if I say, “Yes, I want to be in this research”?</h2>
      <p>
        Your participation in this study will last between 20 and 30 minutes. In
        this experiment you will be asked to perform a task on a computer screen
        that will require your focus. You will be asked to read text, reflect on
        the information, and answer questions about what you read.
      </p>

      <h2>Is there any way being in this study could be bad for me?</h2>
      <p>
        Your participation in this study does not involve any risks other than
        what you would encounter in daily life. In particular, you may
        experience fatigue or boredom, however you may take breaks between
        tasks. The effects of participating should be comparable to those you
        would experience from viewing a computer monitor and using a keyboard.
        You may withdraw at any time.
      </p>

      <h2>
        What happens if I do not want to be in this research or if I say “Yes”,
        but I change my mind later?
      </h2>
      <p>
        You can decide not to participate in this research or you can start and
        then decide to leave the research at any time and it will not be held
        against you. To do so, simply exit the experiment. Any data already
        collected will not be saved.
      </p>

      <h2>What happens to the information collected for the research?</h2>
      <p>
        Efforts will be made to limit the use and disclosure of your personal
        information, including research study records, to people who have a need
        to review this information. We cannot promise complete secrecy.
        Organizations that may inspect and copy your information include the IRB
        and other representatives of this institution.
      </p>
      <p>
        Data Sharing: De-identified data from this study will be shared with the
        research team and the research community at large to advance science and
        health. We will remove or code any personal information that could
        identify you before files are shared with other researchers to ensure
        that, by current scientific standards and known methods, no one will be
        able to identify you from the information we share. Despite these
        measures, we cannot guarantee anonymity of your personal data.
      </p>

      <h2>What else do I need to know?</h2>
      <p>
        Compensation: If you agree to take part in this research study, we will
        pay you $2.50 per ten minutes for your time and effort. You will be paid
        in accordance with the stated policies of Prolific.co. Payment will be
        made upon completion and acceptance of the submission that you have
        agreed to complete and you will be paid via Prolific. If you choose to
        withdraw from the study, you will not be compensated for your
        participation.
      </p>

      <h2>Who can I talk to?</h2>
      <p>
        If you have questions, concerns, or complaints, or think the research
        has affected you in some way, talk to the research team at
        visualthinking@northwestern.edu or call the Primary Investigator, Dr.
        Steven Franconeri at (847) 467-1259. This research has been reviewed and
        approved by an Institutional Review Board (“IRB”). You may talk to them
        at (312) 503-9338 or irb@northwestern.edu if:
      </p>
      <ul>
        <li>
          Your questions, concerns, or complaints are not being answered by the
          research team.
        </li>
        <li>You cannot reach the research team.</li>
        <li>You want to talk to someone besides the research team.</li>
        <li>You have questions about your rights as a research participant.</li>
        <li>
          You want to get information or provide input about this research.
        </li>
      </ul>

      <h2>Consent to Participate</h2>
      <p>
        If you want a copy of this consent for your records, you can print it
        from the screen. If you consent to participate in this experiment, click
        the checkbox below. If you do not wish to participate, please close this
        window now.
      </p>

      <p>
        I understand what the study is about and my rights as a participant. I
        agree to take part in this study.
      </p>

      <p>
        <b>Date:</b>
        {d.toString()}
      </p>

      <Button
        style={{ backgroundColor: "lightgrey", color: "black" }}
        onClick={window.print}
      >
        <span></span> Print a copy of this page
      </Button>
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
          I Consent
        </Button>
      </div>
    </Container>
  );
};

export default Consent;
