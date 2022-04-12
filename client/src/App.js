import React, { useState, useEffect } from "react";
import { useRecoilState } from "recoil";
import { dataState } from "./atoms/data";
import { responseState } from "./atoms/response";
import { answerIndexState } from "./atoms/answerIndex";
import { qualResponseState } from "./atoms/qualResponseIndex";
import { questionState } from "./atoms/questionSelector";
import NavBar from "./components/nav/nav";
import Container from "@mui/material/Container";
import BottomNav from "./components/bottomNav/bottomNav";
//pages
import Task from "./pages/study/task";
import QualTask from "./pages/study/task_qual";
import PreSurveyPage from "./pages/survey/pre";
import PostSurveyPage from "./pages/survey/post";
import CogRefSurveyPage from "./pages/survey/cogRef";
import ConsentPage from "./pages/consent/consent";
import DebriefPage from "./pages/debrief/debrief";
import Instructions1 from "./pages/instructions/instruction1";
import Instructions2 from "./pages/instructions/instructions2";
import Instructions3 from "./pages/instructions/instructions3";
import Instructions4 from "./pages/instructions/instructions4";
import Quiz from "./pages/survey/quiz";
//pages
import LoadingCircle from "./components/loading/loading";
import axios from "axios";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import { choose } from "./functions/functions";

import "./App.css";

const App = () => {
  // const questions = ["strength", "share"];
  const questions = ["strength"];
  const DEV = false;
  const [data, setData] = useRecoilState(dataState);
  const [response, setResponse] = useRecoilState(responseState);
  const [answerIndex, setAnswerIndex] = useRecoilState(answerIndexState);
  const [question, setQuestion] = useRecoilState(questionState);
  const [qualResponseIndex, setQualResponseIndex] =
    useRecoilState(qualResponseState);

  const [loadingOpacity, setLoadingOpacity] = useState(0);

  useEffect(() => {
    const localStorage = window.localStorage;
    /// FOR DEV
    if (DEV) {
      localStorage.clear();
    }

    const sessionResponse = localStorage.getItem("response");
    const sessionAnswerIndex = localStorage.getItem("answerIndex");
    const sessionQualResponseIndex = localStorage.getItem("qualResponseIndex");
    console.log(sessionResponse);
    if (sessionResponse !== null) {
      setResponse(JSON.parse(sessionResponse));
      console.log(sessionResponse);
    }
    if (sessionAnswerIndex !== null) {
      setAnswerIndex(+sessionAnswerIndex);
      console.log("session answer index", sessionAnswerIndex);
    }
    if (sessionQualResponseIndex !== null) {
      setQualResponseIndex(+sessionQualResponseIndex);
      console.log("qual response index", sessionQualResponseIndex);
    }
  }, []);

  useEffect(() => {
    if (response && Object.keys(response).length > 0) {
      window.localStorage.setItem("response", JSON.stringify(response));
    }
  }, [response]);

  useEffect(() => {
    if (response && Object.keys(response).length > 0) {
      window.localStorage.setItem("answerIndex", answerIndex);
    }
  }, [answerIndex]);

  useEffect(() => {
    if (response && Object.keys(response).length > 0) {
      window.localStorage.setItem("qualResponseIndex", qualResponseIndex);
    }
  }, [qualResponseIndex]);

  useEffect(() => {
    if (question) {
      window.localStorage.setItem("question", question);
    }
  }, [question]);

  useEffect(() => {
    async function fetchData() {
      const result = await axios.get("/api/data");
      setTimeout(() => {
        console.log(result.data);
        // let shuffledData = [shuffle(result.data[0]), shuffle(result.data[1])];
        let shuffledData;
        if (DEV) {
          shuffledData = [
            result.data[0].slice(0, 2),
            result.data[1].slice(0, 2),
          ];
        } else {
          shuffledData = [result.data[0], result.data[1]];
          // shuffledData = [
          //   result.data[0].slice(0, 2),
          //   result.data[1].slice(0, 2),
          // ];
        }
        console.log(shuffledData);
        let q = choose(questions);
        console.log(q);
        window.localStorage.setItem("question", q);
        setQuestion(q);
        window.localStorage.setItem("data", JSON.stringify(shuffledData));
        setData(shuffledData);
      }, 1000);
    }

    const sessionData = window.localStorage.getItem("data");
    if (sessionData !== null) {
      setData(JSON.parse(sessionData));
    } else {
      fetchData();
    }
  }, []);

  return (
    <div className="app" style={{ height: "100%", lineHeight: "150%" }}>
      <Router>
        <NavBar height={"7%"} className="navBar"></NavBar>
        <Container
          style={{ height: "86%", margin: "0 auto" }}
          id="root-container"
          maxWidth="lg"
        >
          <Switch>
            <Route
              exact
              path="/"
              render={() => {
                return <Redirect to="/consent" />;
              }}
            />
            <Route path="/consent">
              <ConsentPage></ConsentPage>
            </Route>
            <Route path="/pre" component={PreSurveyPage}></Route>
            <Route path="/instructions1">
              <Instructions1></Instructions1>
            </Route>
            <Route path="/instructions2">
              <Instructions2></Instructions2>
            </Route>
            <Route path="/Instructions3">
              <Instructions3></Instructions3>
            </Route>
            <Route path="/quiz">
              <Quiz></Quiz>
            </Route>
            <Route path="/task1">
              <Task
                phase={0}
                opacity={loadingOpacity}
                setLoadingOpacity={setLoadingOpacity}
              ></Task>
            </Route>
            <Route path="/cogref" component={CogRefSurveyPage}></Route>
            <Route path="/task2">
              <Task
                phase={1}
                opacity={loadingOpacity}
                setLoadingOpacity={setLoadingOpacity}
              ></Task>
            </Route>
            <Route path="/Instructions4">
              <Instructions4></Instructions4>
            </Route>
            <Route path="/task3">
              <QualTask
                opacity={loadingOpacity}
                setLoadingOpacity={setLoadingOpacity}
              ></QualTask>
            </Route>

            <Route path="/post" component={PostSurveyPage}></Route>
            <Route path="/debrief">
              <DebriefPage></DebriefPage>
            </Route>
          </Switch>
        </Container>
        <BottomNav height="7%"></BottomNav>
      </Router>
      <LoadingCircle opacity={loadingOpacity}></LoadingCircle>
    </div>
  );
};

export default App;
