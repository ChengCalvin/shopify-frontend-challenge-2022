import React, { useState, useEffect, useCallback } from "react";
import ImageCard from "../ImageCard/ImageCard";
import Header from "../Header/Header";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import axios from "axios";
import Button from "@material-ui/core/Button";
import KeyboardArrowLeftIcon from "@material-ui/icons/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@material-ui/icons/KeyboardArrowRight";
import { CircularProgress } from "@material-ui/core";
import { Box } from "@material-ui/core";
import Footer from "../Footer/Footer";

const MainPage = () => {
  const currentDate = () => {
    const newDate = new Date();
    const day =
      parseInt(newDate.toLocaleString("en-US", { day: "2-digit" })) - 1;
    const month = newDate.toLocaleString("en-US", { month: "2-digit" });
    const year = newDate.getFullYear();
    return `${year}-${month}-${day}`;
  };

  const [selectedStartDate, setSelectedStartDate] = useState(currentDate());
  const [currentPicture, setCurrentPicture] = useState();
  const [likedPictureList, setLikedPictureList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const getPictures = useCallback(() => {
    const pictureUrl = `https://api.nasa.gov/planetary/apod?api_key=Aw1qq3KdSJ2JaUYmsJSea98qvr5BeNUZxcCqUaiA&date=${selectedStartDate}`;

    setIsLoading(true);
    // fetch picture of the day
    axios
      .get(pictureUrl)
      .then((res) => {
        const data = res.data;
        setCurrentPicture(data);
      })
      .catch((e) => {
        alert(
          "You have reached the latest picture! Please come back tomorrow for a new picture :)"
        );
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [selectedStartDate]);

  // get initial picture on first load
  useEffect(() => {
    getPictures();
  }, [getPictures]);

  const getPreviousPicture = useCallback(() => {
    const prevDate = new Date(selectedStartDate);

    // reduce date by 1
    prevDate.setDate(prevDate.getDate() - 1);

    const day = prevDate.toLocaleString("en-US", { day: "numeric" });
    const month = prevDate.toLocaleString("en-US", { month: "numeric" });
    const year = prevDate.getFullYear();

    setSelectedStartDate(`${year}-${month}-${day}`);
  }, [selectedStartDate]);

  const getNextPicture = useCallback(() => {
    const nextDate = new Date(selectedStartDate);

    // increase date by 1
    nextDate.setDate(nextDate.getDate() + 1);

    const day = nextDate.toLocaleString("en-US", { day: "numeric" });
    const month = nextDate.toLocaleString("en-US", { month: "numeric" });
    const year = nextDate.getFullYear();

    setSelectedStartDate(`${year}-${month}-${day}`);
  }, [selectedStartDate]);

  const onLiked = useCallback(() => {
    // if picture is in the "liked" list, user can click again to remove the picture from the list
    if (likedPictureList.includes(currentPicture?.hdurl)) {
      const newList = likedPictureList?.filter((picture) => {
        return picture !== currentPicture?.hdurl;
      });
      setLikedPictureList([...newList]);
      // always get previous picture as next, in case user starts at the most recent uploaded picture
      getPreviousPicture();
    } else {
      setLikedPictureList([...likedPictureList, currentPicture?.hdurl]);
      getPreviousPicture();
    }
  }, [likedPictureList, currentPicture?.hdurl, getPreviousPicture]);

  const handleStartDateChange = useCallback((date) => {
    setSelectedStartDate(
      `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`
    );
  }, []);

  return (
    <>
      <Header />
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <KeyboardDatePicker
          id="date-picker-dialog"
          label="Start Date"
          value={currentPicture?.date}
          onChange={handleStartDateChange}
          format="yyyy/MM/dd"
          KeyboardButtonProps={{
            "aria-label": "change date",
          }}
        />
      </MuiPickersUtilsProvider>

      {isLoading ? (
        <Box
          sx={{
            width: "100%",
            height: 450,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <CircularProgress />
        </Box>
      ) : (
        <>
          <ImageCard
            imageInfo={currentPicture}
            onLiked={onLiked}
            likedPictureList={likedPictureList}
          />
          <Button onClick={getPreviousPicture}>
            <KeyboardArrowLeftIcon />
          </Button>
          <Button onClick={getNextPicture}>
            <KeyboardArrowRightIcon />
          </Button>
        </>
      )}
      <Footer />
    </>
  );
};

export default MainPage;
