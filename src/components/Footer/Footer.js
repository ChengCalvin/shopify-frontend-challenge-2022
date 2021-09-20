import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import { Link } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  footer: {
    width: "100%",
    height: "fit-content",
    bottom: 0,
    color: "gray",
    marginTop: "2rem",
    borderTop: "2px solid lightgray",
  },
  title: {
    margin: 0,
    fontSize: "0.8rem",
    paddingTop: "1rem",
    paddingBottom: "1rem",
  },
}));

const Footer = () => {
  const classes = useStyles();

  return (
    <footer className={classes.footer}>
      <Typography className={classes.title} variant="h2">
        @Calvin Shopify Challenge 2021
      </Typography>
      <Link href="https://github.com/ChengCalvin/shopify-frontend-challenge-2022">
        Github Project Code :
        github.com/ChengCalvin/shopify-frontend-challenge-2022
      </Link>
    </footer>
  );
};

export default Footer;
