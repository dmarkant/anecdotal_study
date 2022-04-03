import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import PersonIcon from "@material-ui/icons/Person";

var parser = new DOMParser();
function parseString(encodedString) {
  var dom = parser.parseFromString(
    "<!doctype html><body>" + encodedString,
    "text/html"
  );
  var decodedString = dom.body.textContent;
  return decodedString;
}
const useStyles = makeStyles({
  tweetCard: {
    width: "100%",
    padding: "10px",
    borderStyle: "solid",
    borderColor: "lightgrey",
    borderRadius: 10,
    border: "0.1px",
  },
  card: {
    width: "100%",
    backgroundColor: "#white",
    color: "black",
    borderRadius: "10px",
    borderColor: "grey",
    border: "1px",
    borderColor: "lightgrey",
  },
});

const Tweet = (props) => {
  const classes = useStyles();
  const accName = props.accName || "Twitter Account";
  const screen_name = props.screen_name || "tweetScreenName";
  console.log();
  return (
    <div className={classes.card}>
      <div
        className={classes.tweetCard}
        style={{ width: "100%", display: "flex", flexDirection: "row" }}
      >
        <div
          style={{
            flexBasis: "50px",
            justifyContent: "left",
            flexDirection: "row",
          }}
        >
          <div
            style={{
              borderRadius: "50%",
              width: "50px",
              height: "50px",

              backgroundColor: "grey",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <PersonIcon></PersonIcon>
          </div>
        </div>
        <div style={{ flexBasis: 0, flexGrow: 1, marginLeft: "20px" }}>
          <div>
            <span style={{ fontWeight: "bold" }}>{accName + " "} </span>
            <span style={{ color: "grey" }}>@{screen_name}</span>
          </div>
          {/* <Typography variant="body1" style={{ marginBottom: "10px" }}>
          {parseString(props.text)}
        </Typography> */}
          <p
            style={{
              marginBottom: "10px",
              fontSize: "20px",
              margin: 0,
              marginBottom: "10px",
            }}
          >
            {parseString(props.text)}
          </p>
          {props.showImage ? (
            <img
              src={props.src}
              style={{ borderRadius: 15, width: "80%", marginTop: "20px" }}
              alt="tweet content"
            />
          ) : null}
          {props.children}
        </div>
      </div>
    </div>
  );
};

export default Tweet;
