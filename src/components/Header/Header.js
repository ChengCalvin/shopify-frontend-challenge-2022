import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles((theme) => ({
  header: {
    width: "100%",
    height: "fit-content",
    top: 0,
    color: "black",
    marginBottom: "2rem",
    borderBottom: "2px solid #5E8E3E",
  },
  title: {
    margin: 0,
    fontSize: "3rem",
    paddingTop: "1rem",
    paddingBottom: "1rem",
    color: "#FFFFFF",
  },
}));

const Header = () => {
  const classes = useStyles();

  return (
    <header className={classes.header}>
      <Typography className={classes.title} variant="h1">
        Picture Match
      </Typography>
    </header>
  );
};

export default Header;
