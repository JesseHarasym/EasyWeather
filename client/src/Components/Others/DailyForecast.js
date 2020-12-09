import React from "react";
let moment = require("moment");

//this is a basic function so that it can be mapped out on our home page
//this function creates all the weather cards to display our 5 day forecast
let DailyForecast = ({ data, tempUnit }) => {
  let units = tempUnit; //temperature unit to be shown to user
  //get date and time, so we can display it properely in our weather cards
  let date = new Date();
  let time = data.dt * 1000;
  date.setTime(time);

  //set current date and day as needed for our cards
  let currentDate = moment(date).format("MMM D, YYYY");
  let currentDay = moment(currentDate).format("dddd");
  //set current temp rounded to show no decimals
  let currentTemp = Math.round(data.main.temp);
  //set weather description as needed for our cards
  let weatherDescription = data.weather[0].description;

  return (
    <div className="col-sm-2">
      <div className="card pt-2" style={center}>
        <h4 className="card-title p-3">{currentDay}</h4>
        <p>{currentDate}</p>
        {/* basic turnery to show temperature according to units provided */}
        <h2 className="p-2">
          {units === "metric"
            ? currentTemp + " °C"
            : units === "imperial"
            ? currentTemp + " °F"
            : currentTemp + " K"}
        </h2>
        <p className="p-2">{weatherDescription}</p>
      </div>
    </div>
  );
};

const center = {
  alignItems: "center",
};

export default DailyForecast;
