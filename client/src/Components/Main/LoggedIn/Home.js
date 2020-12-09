import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import { logoutUser } from "../../../Authorization/Routes/routeDispatch";
import API from "../../../API/API_Keys";
import DailyForecast from "../../Others/DailyForecast";
import Navigation from "./Navigation";

//this is the home page showed to users who are logged in and authorized
//i made seperate page, because I plan on expanding it/changing it to vary heavily from original home page for non logged in users
class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: this.props.auth.user, //pass current authorized user to state
      data: [],
      dailyForecast: [],
      city: "",
      country: "",
      units: "",
      submittedCity: "",
      submittedUnits: "",
      invalidCity: false,
    };
    //bind changes to state
    this.handleChangeCity = this.handleChangeCity.bind(this);
    this.handleChangeUnits = this.handleChangeUnits.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    //when mounting component, set intial state to our authorized user data
    this.setState(
      {
        city: this.state.user.city,
        submittedCity: this.state.user.city,
        units: this.state.user.temperature,
        submittedUnits: this.state.user.temperature,
      },
      //then fetch from API with our user data
      () => {
        this.searchForCityData();
      }
    );
  }

  //fetch city weather data from API
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
        {/* navigation bar for logged in users */}
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

//define types with prop-types package, since we can't define in our constructor
Home.propTypes = {
  auth: PropTypes.object.isRequired,
};

//map redux state to props to access it in our component
const mapStateToProps = (state) => ({
  auth: state.auth,
});

//connect our component to our redux store and export it
export default connect(mapStateToProps, { logoutUser })(Home);
