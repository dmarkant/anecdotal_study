import React from "react";
import { makeStyles } from "@mui/styles";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  title: {
    flexGrow: 1,
  },
  navBar: {
    height: "100%",
    // backgroundColor: "lightgrey",
  },
}));

export default function NavBar(props) {
  const classes = useStyles();

  return (
    <div className={classes.root} style={{ height: props.height }}>
      <AppBar
        position="sticky"
        className={classes.navBar}
        color="secondary"
        // style={{ backgroundColor: "lightgrey" }}
      >
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            Social Media News Judgment Study
          </Typography>
        </Toolbar>
      </AppBar>
    </div>
  );
}
