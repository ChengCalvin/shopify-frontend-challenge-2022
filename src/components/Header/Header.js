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
    borderBottom: "2px solid lightgray",
  },
  title: {
    margin: 0,
    fontSize: "2rem",
    paddingTop: "1rem",
    paddingBottom: "1rem",
  },
}));

const Header = () => {
  const classes = useStyles();

  return (
    <header className={classes.header}>
      <Typography className={classes.title} variant="h2">
        Space Picture of the Day
      </Typography>
    </header>
  );
};

export default Header;
