import * as React from "react";

import TextField from "@mui/material/TextField";
import { Typography } from "@mui/material/";

export default function FullWidthTextField(props) {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "flex-start",
        flexDirection: "column",
        gap: "20px",
      }}
    >
      <Typography variant="h6">
        Please type down the reason for your judgement below.
      </Typography>
      <TextField
        fullWidth
        multiline={true}
        value={props.qualResponse}
        minRows={3}
        label="your response"
        id="fullWidth"
        onChange={(event) => {
            props.setQualResponse(event.target.value);
        }}
        style={{ marginBottom: "20px" }}
      />
    </div>
  );
}
