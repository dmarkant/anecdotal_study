import React, { useEffect, useState } from "react";
import Slider from "@mui/material/Slider";
import { styled } from "@mui/material/styles";
import { Typography } from "@mui/material/";
import { useRecoilValue } from "recoil";
import { sliderStepsState } from "../../atoms/sliderSteps";

const StyledSlider = styled(Slider)(({ theme }) => ({
  "& .MuiSlider-mark": {
    backgroundColor: "black",
    height: 8,
    width: 3,
    "&.MuiSlider-markActive": {
      opacity: 1,
      backgroundColor: "currentColor",
    },
    "&.MuiSlider-markLabelActive": {
      opacity: 1,
      color: "rgba(0, 0, 0, 0.6)",
      backgroundColor: "black",
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
  const stepsValue = useRecoilValue(sliderStepsState);
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
        marginBottom: "25px",
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
          step={stepsValue}
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
