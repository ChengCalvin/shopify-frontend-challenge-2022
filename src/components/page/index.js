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
import AddIcon from "@material-ui/icons/Add";
import RemoveIcon from "@material-ui/icons/Remove";

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

  const getPictures = useCallback(() => {
    const pictureUrl = `https://api.nasa.gov/planetary/apod?api_key=Aw1qq3KdSJ2JaUYmsJSea98qvr5BeNUZxcCqUaiA&date=${selectedStartDate}`;

    // fetch picture of the day
    axios.get(pictureUrl).then((res) => {
      const data = res.data;
      setCurrentPicture(data);
    });
  }, [selectedStartDate]);

  // get initial picture on first load
  useEffect(() => {
    getPictures();
  }, [getPictures]);

  const getPreviousPicture = useCallback(() => {
    const nextDate = new Date(selectedStartDate);

    // date initially + 1, so there is no need to reduce the days
    let day = nextDate.toLocaleString("en-US", { day: "2-digit" });

    // case if day reaches 0, subtract 1 from month reset day
    let month =
      day - 1 === 0
        ? nextDate.toLocaleString("en-US", { month: "2-digit" }) - 1
        : nextDate.toLocaleString("en-US", { month: "2-digit" });

    // case if month reaches 0, subtract 1 from month
    let year =
      month === 0 ? nextDate.getFullYear() - 1 : nextDate.getFullYear();

    // reset to last day of month
    if (day - 1 === 0) {
      day = new Date(year, month, 0).toLocaleString("en-US", {
        day: "2-digit",
      });
    }

    // reset to last day of year
    if (month === 0) {
      month = 12;
      day = new Date(year, month, 0).toLocaleString("en-US", {
        day: "2-digit",
      });
    }

    setSelectedStartDate(`${year}-${month}-${day}`);
  }, [selectedStartDate]);

  const getNextPicture = useCallback(() => {
    const nextDate = new Date(selectedStartDate);

    if (nextDate.getTime() >= new Date(currentDate()).getTime()) {
      alert("You are already at the last Picture");
      return;
    }

    // increase day by 1, date initial value starts at T-1
    let day =
      parseInt(nextDate.toLocaleString("en-US", { day: "2-digit" })) + 1;

    // increase month if at last day
    const increaseMonth = !(
      day.toLocaleString() <=
      new Date(
        nextDate.getFullYear(),
        parseInt(nextDate.toLocaleString("en-US", { month: "2-digit" })),
        0
      ).toLocaleString("en-US", { day: "2-digit" })
    );

    // increase month if day over last day of month
    let month = increaseMonth
      ? parseInt(nextDate.toLocaleString("en-US", { month: "2-digit" })) + 1
      : nextDate.toLocaleString("en-US", { month: "2-digit" });

    // increase year if at last day of year
    let year =
      month === 12 && day === 31
        ? nextDate.getFullYear() + 1
        : nextDate.getFullYear();

    // reset day to 1 at end of month
    if (increaseMonth) {
      day = 1;
    }

    // reset month and day after year end
    if (month === 12 && day === 31) {
      month = 1;
      day = 1;
    }
    setSelectedStartDate(`${year}-${month}-${day}`);
  }, [selectedStartDate]);

  const onLiked = useCallback(() => {
    if (likedPictureList.includes(currentPicture?.hdurl)) {
      const newList = likedPictureList?.filter((picture) => {
        return picture !== currentPicture?.hdurl;
      });
      setLikedPictureList([...newList]);
    } else {
      setLikedPictureList([...likedPictureList, currentPicture?.hdurl]);
    }
  }, [likedPictureList, currentPicture?.hdurl]);

  const handleStartDateChange = useCallback((date) => {
    console.log(date.getMonth());
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

      <ImageCard
        imageInfo={currentPicture}
        onLiked={onLiked}
        likedPictureList={likedPictureList}
      />

      <Button onClick={getPreviousPicture}>
        <RemoveIcon />
      </Button>
      <Button onClick={getNextPicture}>
        <AddIcon />
      </Button>
    </>
  );
};

export default MainPage;
