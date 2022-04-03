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
    border: "0.5px",
    borderColor: "#AAB8C2",
    borderStyle: "solid",
    borderRadius: "20px",
    marginTop: "10px",
  },
});

const Tweet = (props) => {
  const classes = useStyles();
  const accName = props.accName || "Twitter Account";
  const screen_name = props.screen_name || "tweetScreenName";
  console.log();
  return (
    <div
      className={classes.tweetCard}
      style={{ width: "100%", display: "flex", flexDirection: "row" }}
    >
      <div
        style={{
          flexBasis: 0,
          flexGrow: 1,
        }}
      >
        <div
          style={{
            alignItems: "center",
            display: "flex",
          }}
        >
          <div
            style={{
              borderRadius: "50%",
              width: "25px",
              height: "25px",
              backgroundColor: "grey",
              display: "inline-block",
              marginRight: "2px",
              marginBottom: "5px",
            }}
          >
            <PersonIcon></PersonIcon>
          </div>
          <span style={{ fontWeight: "bold", marginRight: "2px" }}>
            {accName + " "}{" "}
          </span>
          <span style={{ color: "grey" }}>@{screen_name}</span>
        </div>
        <p
          style={{
            marginBottom: "5px",
            fontSize: "20px",
            margin: 0,
          }}
        >
          {parseString(props.text)}
        </p>
        {props.showImage ? (
          <img
            src={props.src}
            style={{ borderRadius: 15, width: "100%", marginTop: "20px" }}
            alt="tweet content"
          />
        ) : null}
      </div>
    </div>
  );
};

export default Tweet;
