import React from "react";

import API from "../../../API/API_Keys";
import DailyForecast from "../../Others/DailyForecast";
import Navigation from "./Navigation";

//this is the home page showed to users who aren't logged in
class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      dailyForecast: [],
      city: "",
      country: "",
      units: "metric",
      submittedCity: "",
      submittedUnits: "metric",
      invalidCity: false,
    };
    //bind changes to state
    this.handleChangeCity = this.handleChangeCity.bind(this);
    this.handleChangeUnits = this.handleChangeUnits.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    //on component mount, ask user to share their location, if successful then show weather data according to location
    let success = (position) => {
      const weatherURL = `http://api.openweathermap.org/data/2.5/forecast?lat=${position.coords.latitude}&lon=${position.coords.longitude}&units=${this.state.units}&appid=${API}`;
      fetch(weatherURL)
        .then((res) => res.json())
        .then((data) => {
          //filter data to readable format for state
          let dailyData = data.list.filter((reading) =>
            reading.dt_txt.includes("21:00:00")
          );
          //set new state to filtered data recieved from api call
          this.setState({
            data: data,
            dailyForecast: dailyData,
            country: data.city.country,
            submittedCity: data.city.name,
          });
        });
    };
    //if user does not share data, then console log error
    let error = () => {
      console.log("We are not able to determine your location..");
    };
    //used to wait for success or error and respond appropriately
    navigator.geolocation.watchPosition(success, error);
  }

  //fetch city weather data from API when user searches city or changes temperature units
  searchForCityData() {
    const weatherURL = `http://api.openweathermap.org/data/2.5/forecast?q=${this.state.city}&units=${this.state.units}&appid=${API}`;
    fetch(weatherURL)
      .then((res) => res.json())
      .then((data) => {
        try {
          //try filtering data to determine if the city is a valid city
          let dailyData = data.list.filter((reading) =>
            reading.dt_txt.includes("21:00:00")
          );
          //set new state to filtered data if its a valid city
          this.setState({
            data: data,
            dailyForecast: dailyData,
            country: data.city.country,
            invalidCity: false,
          });
        } catch {
          //if data cannot be filtered, then it's invalid city, set state to reflect this
          this.setState({
            invalidCity: true,
          });
        }
      });
  }

  //handle city changes
  handleChangeCity(event) {
    this.setState({
      city: event.target.value,
    });
  }

  //handle unit changes
  handleChangeUnits(event) {
    this.setState({ units: event.target.value });
  }

  //handle when user submits
  handleSubmit(event) {
    event.preventDefault(); //stop default page redirect
    //change state to new data from user
    this.setState(
      {
        city: this.state.city,
        submittedCity: this.state.city,
        units: this.state.units,
        submittedUnits: this.state.units,
      },
      //fetch from api for new weather data
      () => {
        this.searchForCityData();
      }
    );
  }

  //capatlize first letter of city name if user inputs as small characters
  //want to change to handle first letter of each word for cities with names that are more then one word
  capatlizeCity(city) {
    return city.charAt(0).toUpperCase() + city.slice(1);
  }

  render() {
    return (
      <div>
        {/* navigation bar for users who are not logged in */}
        <Navigation />
        <div className="pb-5">
          <br />
          <br />
          <h1 style={center} className="p-5 text-light">
            EasyWeather
          </h1>
          <br />
          <div style={center}>
            {/* base form for handling user submits */}
            <form onSubmit={this.handleSubmit}>
              <input
                value={this.state.city}
                onChange={this.handleChangeCity}
                type="text"
                className="p-2 m-4 rounded border-0"
                placeholder="Your city.."
              />
              <select
                value={this.state.units}
                onChange={this.handleChangeUnits}
                className="p-2 m-4 rounded border-0"
              >
                <option value="metric">Celcius</option>
                <option value="imperial">Fahrenheit</option>
                <option value="kelvin">Kelvin</option>
              </select>
              <input
                className="btn btn-info ml-5 pl-3 pr-3"
                type="submit"
                value="Search"
              />
              {/* if city is invalid, then show a message stating so */}
              <p className="text-light" style={center}>
                {this.state.invalidCity === true
                  ? "Invalid city search.. please try again."
                  : ""}
              </p>
            </form>
          </div>
        </div>
        {/* only show 5 day forecast text if city is valid */}
        <div className="pt-2">
          <h2 style={center} className="text-light pb-4 pt-2">
            {this.state.submittedCity !== "" && this.state.invalidCity === false
              ? "5 Day Forecast"
              : ""}
          </h2>
          <h5
            className="text-light pb-5"
            style={({ textTransform: "capitalize" }, center)}
          >
            {/* only show city information if city is valid and capatlize first letter of city */}
            {this.state.invalidCity === false
              ? this.capatlizeCity(this.state.submittedCity) +
                " " +
                this.state.country
              : ""}
          </h5>
          <h5 className="justify-content-center row">
            {/* if city is valid then use DailyForecast component to map out the weather cards*/}
            {this.state.invalidCity === false
              ? this.state.dailyForecast.map((data, key) => (
                  <DailyForecast
                    key={key}
                    data={data}
                    tempUnit={this.state.submittedUnits}
                  />
                ))
              : ""}
          </h5>
        </div>
      </div>
    );
  }
}

//basic styling for centering various components
const center = {
  display: "flex",
  justifyContent: "center",
};

export default Home;
