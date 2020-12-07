import React from "react";
let moment = require("moment");

const center = {
  alignItems: "center",
};

let DailyForecast = ({ data, tempUnit }) => {
  let units = tempUnit;
  let date = new Date();
  let time = data.dt * 1000;
  date.setTime(time);

  let currentDate = moment(date).format("MMM D, YYYY");
  let currentDay = moment(currentDate).format("dddd");
  let currentTemp = Math.round(data.main.temp);
  let weatherDescription = data.weather[0].description;

  return (
    <div className="col-sm-2">
      <div className="card pt-2" style={center}>
        <h4 className="card-title p-3">{currentDay}</h4>
        <p>{currentDate}</p>
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

export default DailyForecast;
