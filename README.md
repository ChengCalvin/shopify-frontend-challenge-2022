# Shopify Frontend Challenge Winter 2022

This project was implemented using React and Material UI for the web interface and Axios for Rest API calls to retrieve the image information from NASA. The objective of this project was to create a simple UI design for users to like or unlike images from space by taken NASA. The code was written with the functionality in mind and to present a simple UI to no overload the users with information. (Project Link: https://picture-match.herokuapp.com/)

## To run this project

To run this project, you can simply run `npm install` followed by `npm run start`

## The Idea

Following the criteria, the first thing that came to mind was to design a Tinder like method to like and unlike a picture. With the idea that the Next day picture from Today would be empty, the user will move through the pictures backwards since we are looking at `Pictures of the day` from NASA.

## Features

The features in this project was to allow the user to browse through the catalogues of pictures provided by `Astronomy Picture of the Day (APOD)` with `Previous` and `Next` `button` designed for users to move forward or backward by 1 day and a `calendar input field` that allows users to start looking from a specific day or to look for a picture at a specific day picture. There is also an option to allow users to share their pictures to `Facebook`.

## Other features

If given more time, other features that can be added such as the Tinder swipe animation, better UI design, a history of liked pictures from the user and many more. With the limitation from the API calls it is potentially `slow` for the fetching of the next image to happen in which we can use a loading spinner. Other sharing method can be added as well but for this project to keep it simple, only `Facebook` sharing will be used for you to enjoy the pictures instead :).
