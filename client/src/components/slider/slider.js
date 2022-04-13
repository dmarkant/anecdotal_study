import React, { useEffect, useState } from "react";
import Slider from "@mui/material/Slider";
import { styled } from "@mui/material/styles";
import { Typography } from "@mui/material/";

const StyledSlider = styled(Slider)(({ theme }) => ({
  "& .MuiSlider-mark": {
    backgroundColor: "black",
    height: 8,
    width: 3,
    "&.MuiSlider-markActive": {
      opacity: 1,
      backgroundColor: "currentColor",
    },
  },
}));

const CustomSlider = ({
  labels,
  domain,
  question,
  handleResponse,
  response,
}) => {
  const [value, setValue] = useState(null);
  const range = domain[1] - domain[0];
  const marks = labels.map((l, i) => {
    return {
      label: l,
      value: domain[0] + (range / (labels.length - 1)) * i,
    };
  });

  useEffect(() => {
    setValue(response);
  }, [response]);
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        marginBottom: "10px",
        marginTop: "10px",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "flex-start",
          flexDirection: "column",
          gap: "20px",
        }}
      >
        <Typography variant="h6">{question}</Typography>
        <StyledSlider
          value={value == null ? 0.5 : value}
          step={0.01}
          marks={marks}
          min={domain[0]}
          max={domain[1]}
          onChangeCommitted={handleResponse}
          onChange={(e, r) => {
            setValue(r);
          }}
          valueLabelDisplay="off"
        />
      </div>
    </div>
  );
};

export default CustomSlider;
