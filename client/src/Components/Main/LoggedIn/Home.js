import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import { logoutUser } from "../../../Authorization/Routes/routeDispatch";
import API from "../../../API/API_Keys";
import DailyForecast from "../../Others/DailyForecast";
import Navigation from "./Navigation";

const center = {
  display: "flex",
  justifyContent: "center",
};

class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: this.props.auth.user,
      data: [],
      dailyForecast: [],
      city: "",
      country: "",
      units: "",
      submittedCity: "",
      submittedUnits: "",
      invalidCity: false,
    };
    this.handleChangeCity = this.handleChangeCity.bind(this);
    this.handleChangeUnits = this.handleChangeUnits.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    this.setState(
      {
        city: this.state.user.city,
        submittedCity: this.state.user.city,
        units: this.state.user.temperature,
        submittedUnits: this.state.user.temperature,
      },
      () => {
        this.searchForCityData();
      }
    );
  }

  searchForCityData() {
    const weatherURL = `http://api.openweathermap.org/data/2.5/forecast?q=${this.state.city}&units=${this.state.units}&appid=${API}`;
    fetch(weatherURL)
      .then((res) => res.json())
      .then((data) => {
        try {
          let dailyData = data.list.filter((reading) =>
            reading.dt_txt.includes("21:00:00")
          );
          this.setState({
            data: data,
            dailyForecast: dailyData,
            country: data.city.country,
            invalidCity: false,
          });
        } catch {
          this.setState({
            invalidCity: true,
          });
        }
      });
  }

  handleChangeCity(event) {
    this.setState({
      city: event.target.value,
    });
  }

  handleChangeUnits(event) {
    this.setState({ units: event.target.value });
  }

  handleSubmit(event) {
    this.setState(
      {
        city: this.state.city,
        submittedCity: this.state.city,
        units: this.state.units,
        submittedUnits: this.state.units,
      },
      () => {
        this.searchForCityData();
      }
    );
    event.preventDefault();
  }

  capatlizeCity(city) {
    return city.charAt(0).toUpperCase() + city.slice(1);
  }

  render() {
    return (
      <div>
        <Navigation />
        <div className="pb-5">
          <br />
          <br />
          <h1 style={center} className="p-5 text-light">
            EasyWeather
          </h1>
          <br />
          <div style={center}>
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
              <p className="text-light" style={center}>
                {this.state.invalidCity === true
                  ? "Invalid city search.. please try again."
                  : ""}
              </p>
            </form>
          </div>
        </div>
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
            {this.state.invalidCity === false
              ? this.capatlizeCity(this.state.submittedCity) +
                " " +
                this.state.country
              : ""}
          </h5>
          <h5 className="justify-content-center row">
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

Home.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { logoutUser })(Home);
