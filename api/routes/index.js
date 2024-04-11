const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const responseSchema = require("../models/response");
const csv = require("csvtojson");
const path = require("path");
const fs = require("fs");
const _ = require("lodash");
// const Response = require("../models/response");
const randomstring = require("randomstring");
const { json } = require("express/lib/response");
// API calls
let test = false;
let collection = "response";

const Response = mongoose.model(collection, responseSchema);

router.get("/consent", (req, res) => {
  if (!req.session.consent) {
    // let usertoken = randomstring.generate(8);
    let PROLIFIC_PID = req.query.PROLIFIC_PID;
    let STUDY_ID = req.query.STUDY_ID;
    let SESSION_ID = req.query.SESSION_ID;
    let usertoken = randomstring.generate(8);
    console.log(usertoken);
    console.log(PROLIFIC_PID);
    if (PROLIFIC_PID !== "null") {
      usertoken = req.query.PROLIFIC_PID;
    }
    console.log(usertoken);

    req.session.consent = true;
    req.session.completed = false;
    req.session.usertoken = usertoken;

    let newResponse = new Response({
      usertoken: usertoken,
      STUDY_ID: STUDY_ID,
      SESSION_ID: SESSION_ID,
      PROLIFIC_PID: PROLIFIC_PID,
    });
    console.log(newResponse);

    newResponse.save(function (err) {
      if (err) console.log(err);
      res.send({
        token: usertoken,
      });
    });
  } else {
    res.send({
      token: req.session.usertoken,
    });
  }
});

router.post("/preq", (req, res) => {
  console.log(req.body);
  let usertoken = req.session.usertoken;
  Response.findOneAndUpdate(
    { usertoken: usertoken },
    { preq: req.body },
    (err, doc) => {
      if (err) req.status(404).send(err);
      else res.json(req.body);
    }
  );
});

router.post("/cogref", (req, res) => {
  console.log(req.body);
  let usertoken = req.session.usertoken;
  Response.findOneAndUpdate(
    { usertoken: usertoken },
    { cogref: req.body },
    (err, doc) => {
      if (err) req.status(404).send(err);
      else res.json(req.body);
    }
  );
});

router.post("/instruction", (req, res) => {
  console.log(req.body);
  let usertoken = req.session.usertoken;
  Response.findOneAndUpdate(
    { usertoken: usertoken },
    { instructions: req.body },
    (err, doc) => {
      if (err) req.status(404).send(err);
      else res.json(req.body);
    }
  );
});

router.post("/quiz", (req, res) => {
  console.log(req.body);
  let usertoken = req.session.usertoken;
  Response.findOneAndUpdate(
    { usertoken: usertoken },
    { quiz: req.body },
    (err, doc) => {
      if (err) req.status(404).send(err);
      else res.json(req.body);
    }
  );
});

router.get("/debrief", (req, res) => {
  if (req.session.completed) {
    res.status(200).json({ token: req.session.usertoken });
  } else {
    res.status(200).send({
      token: "you have skiped pages. Please complete the study first.",
    });
  }
});

router.post("/postq", (req, res) => {
  console.log(req.body);
  let usertoken = req.session.usertoken;
  req.session.completed = true;
  Response.findOneAndUpdate(
    { usertoken: usertoken },
    { postq: req.body },
    (err, doc) => {
      if (err) req.status(404).send(err);
      else res.status(200).json(req.body);
    }
  );
});

router.post("/response", (req, res) => {
  console.log(req.body);
  let usertoken = req.session.usertoken;
  Response.findOneAndUpdate(
    { usertoken: usertoken },
    { responses: req.body },
    (err, doc) => {
      if (err) req.status(404).send(err);
      else res.status(200).json({ usertoken: req.session.usertoken });
    }
  );
});

router.get("/data", async (req, res) => {
  let data = await randomize_data();
  res.status(200).json(data);
});

async function randomize_data() {
  let p = path.join(__dirname, "/../../public/");
  console.log("loading materials from:", p);
  const jsonArray = await csv().fromFile(
    path.join(p + "2024-OEC-materials.csv")
  );
  let facesPath = path.join(p, "/faces");
  console.log("loading faces from:", facesPath);
  const peopleImages = shuffle(fs.readdirSync(facesPath));
  jsonArray.forEach((entry, ind) => {
    let fileName = peopleImages[ind];
    let person_name = fileName.replace(".png", "");
    entry["person_image_path"] = `/faces/${fileName}`;
    entry["person_name"] = person_name;
  });

  console.log("assigning stimuli to phases");

  let phase_1 = [];
  let phase_2 = [];
  let phase_3 = [];
  let phase_4 = [];

  // there are 4 CT topics, 4 non-CT topics
  // randomize counterbalance conditions
  let cb_cond_CT = shuffle([...Array(8).keys()]);
  let cb_cond_nonCT = shuffle([...Array(8).keys()]);
  console.log(cb_cond_CT);
  console.log(cb_cond_nonCT);

  let CT_entries = jsonArray.filter((entry) => entry["topic_general"] == "CT");
  let CT_quads = nestArray(CT_entries, 4);

  let nonCT_entries = jsonArray.filter((entry) => entry["topic_general"] == "Non-CT");
  let nonCT_quads = nestArray(nonCT_entries, 4);

  // map counterbalance condition to order for pairs and evidence types
  for (var k = 0; k < 2; k++) {
    let topic_type = k == 0 ? "CT" : "Non-CT";

    for (var i = 0; i < 4; i++) {
      console.log(topic_type, i);
      if (topic_type == "CT") {
        cb = cb_cond_CT[i];
        group = CT_quads[i];
      } else {
        cb = cb_cond_nonCT[i];
        group = nonCT_quads[i];
      }
      
      let pair1_A = group.filter((entry) => entry["pair"] == "1" && entry["evidence_type"] == "Anecdotal")[0];
      let pair1_NA = group.filter((entry) => entry["pair"] == "1" && entry["evidence_type"] == "Not Anecdotal")[0];
      let pair2_A = group.filter((entry) => entry["pair"] == "2" && entry["evidence_type"] == "Anecdotal")[0];
      let pair2_NA = group.filter((entry) => entry["pair"] == "2" && entry["evidence_type"] == "Not Anecdotal")[0];

      let order;
      if (cb == 0) {
        order = [pair1_A, pair2_A, pair1_NA, pair2_NA];
      } else if (cb == 1) {
        order = [pair1_NA, pair2_NA, pair1_A, pair2_A];
      } else if (cb == 2) {
        order = [pair2_A, pair1_A, pair2_NA, pair1_NA];
      } else if (cb == 3) {
        order = [pair2_NA, pair1_NA, pair2_A, pair1_A];
      } else if (cb == 4) {
        order = [pair1_A, pair2_NA, pair1_NA, pair2_A];
      } else if (cb == 5) {
        order = [pair1_NA, pair2_A, pair1_A, pair2_NA];
      } else if (cb == 6) {
        order = [pair2_A, pair1_NA, pair2_NA, pair1_A];
      } else if (cb == 7) {
        order = [pair2_NA, pair1_A, pair2_A, pair1_NA];
      };

      console.log(order);
      phase_1.push(order[0]);
      phase_2.push(order[1]);
      phase_3.push(order[2]);
      phase_4.push(order[3]);

    }
  }

  // get a random ordering of topics within each block
  // (and keep it the same across blocks so every post
  // is separated by same amount)
  let indices2 = shuffle([...Array(phase_1.length).keys()]);
  phase_1 = indices2.map((ind) => phase_1[ind]);
  phase_2 = indices2.map((ind) => phase_2[ind]);
  phase_3 = indices2.map((ind) => phase_3[ind]);
  phase_4 = indices2.map((ind) => phase_4[ind]);

  // now combine back into 2 phases so we don't break
  // something else
  phase_1_final = phase_1.concat(phase_2);
  phase_2_final = phase_3.concat(phase_4);

  return [phase_1_final, phase_2_final];



  // let quads = nestArray(jsonArray, 4);
  // let groups = quads.map((quad) => {
  //   return nestArray(quad, 2);
  // });

  // phase_1 = [];
  // phase_2 = [];
  // groups.forEach((group) => {
  //   //console.log(group);
  //   let firstIndex = getRandomInt(2);
  //   let secondIndex = firstIndex ^ 1;
  //   //console.log(firstIndex, secondIndex);
  //   // console.log(group);
  //   phase_1.push(group[0][firstIndex]);
  //   phase_1.push(group[1][secondIndex]);
  //   phase_2.push(group[0][secondIndex]);
  //   phase_2.push(group[1][firstIndex]);
  // });
  // let indices = shuffle([...Array(phase_1.length).keys()]);
  // phase_1 = indices.map((ind) => phase_1[ind]);
  // phase_2 = indices.map((ind) => phase_2[ind]);

  // console.log(phase_1.length);
  // console.log(phase_2.length);

  // return [phase_1, phase_2];
}

randomize_data();

function nestArray(array, size) {
  let arrayCopy = [...array];
  let nest = [];
  while (arrayCopy.length > 0) nest.push(arrayCopy.splice(0, size));
  return nest;
}

function choose(choices) {
  var index = Math.floor(Math.random() * choices.length);
  return choices[index];
}

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

function shuffle(array) {
  var currentIndex = array.length,
    temporaryValue,
    randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

module.exports = router;
