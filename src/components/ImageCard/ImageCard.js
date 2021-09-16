import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Collapse from "@material-ui/core/Collapse";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import FavoriteIcon from "@material-ui/icons/Favorite";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { FacebookShareButton } from "react-share";
import FacebookIcon from "@material-ui/icons/Facebook";

const useStyles = makeStyles((theme) => ({
  root: {
    width: 450,
    margin: "auto",
    marginTop: "2rem",
    marginBottom: "2rem",
    paddingBottom: "1rem",
    textAlign: "start",
  },
  media: {
    height: 0,
    paddingTop: "56.25%",
  },
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: "rotate(180deg)",
  },
  fbIcon: {
    color: "light-gray",
    "&:hover": {
      color: "#4267B2",
    },
  },
}));

const ImageCard = ({ imageInfo, onLiked, likedPictureList }) => {
  const classes = useStyles();
  const [expanded, setExpanded] = useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Card className={classes.root}>
      <CardHeader title={imageInfo?.title} subheader={imageInfo?.date} />
      <CardMedia
        className={classes.media}
        image={imageInfo?.hdurl}
        title="SpacePicture"
      />
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">
          {`Copyright: ${
            imageInfo?.copyright === undefined
              ? "Brought to you by NASA Astronomy Photo of the Day"
              : imageInfo?.copyright
          }`}
        </Typography>
      </CardContent>

      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites" onClick={onLiked}>
          <FavoriteIcon
            color={
              likedPictureList?.includes(imageInfo?.hdurl) ? "secondary" : ""
            }
          />
        </IconButton>

        <FacebookShareButton url={imageInfo?.hdurl}>
          <FacebookIcon className={classes.fbIcon} />
        </FacebookShareButton>

        <IconButton
          className={clsx(classes.expand, {
            [classes.expandOpen]: expanded,
          })}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </IconButton>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography variant="body2" color="textSecondary" component="p">
            {imageInfo?.explanation}
          </Typography>
        </CardContent>
      </Collapse>
    </Card>
  );
};

export default ImageCard;
