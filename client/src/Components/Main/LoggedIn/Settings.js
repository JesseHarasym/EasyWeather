import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import { editUser } from "./../../../Authorization/Routes/routeDispatch";
import Navigation from "./Navigation";

//this is settings page for users who are currently logged in and authorized
//currently you can only change your name, prefered city and prefered temperature units, with plans to expand to email/password
class Settings extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: this.props.auth.user.name,
      city: this.props.auth.user.city,
      temperature: this.props.auth.user.temperature,
      errors: {},
    };
  }

  //to recieve errors from server side validator if input fails validation test
  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({
        errors: nextProps.errors,
      });
    }
  }

  //set state on input changed by user
  onChange = (e) => {
    this.setState({ [e.target.id]: e.target.value });
  };

  onSubmit = (e) => {
    e.preventDefault(); //stop default page redirect
    //create user object that contains the new settings data
    console.log(this.props.auth.user);
    const User = {
      id: this.props.auth.user.id,
      name: this.state.name,
      email: this.props.auth.user.email,
      city: this.state.city,
      temperature: this.state.temperature,
    };
    console.log(User);
    //send new data to route dispatcher to be sent to backend and processed
    this.props.editUser(User, this.props.history);
  };

  render() {
    //constant to display error variables passed to the state to be displayed from backend validation
    const { errors } = this.state;
    return (
      <div>
        <Navigation />
        <div className="col d-flex justify-content-center">
          <div
            className="card p-5 border-secondary"
            style={{ marginTop: "10%" }}
          >
            <div className="p-3">
              <h3 className="pb-2">Settings for EasyWeather</h3>
              <div style={{ marginLeft: "13%" }}></div>
              <h5 style={{ marginLeft: "2.7rem" }}>
                Edit your settings below!
                <br />
              </h5>
            </div>
            {/* base form for handling user submits */}
            <form noValidate onSubmit={this.onSubmit}>
              <div>
                <input
                  placeholder="Name"
                  onChange={this.onChange}
                  value={this.state.name}
                  error={errors.name}
                  id="name"
                  type="name"
                />
                <br />
                {/* spans are used to display validation errors */}
                <span>{errors.name}</span>
              </div>
              <div>
                <input
                  placeholder="Preferred City"
                  onChange={this.onChange}
                  value={this.state.city}
                  error={errors.city}
                  id="city"
                  type="city"
                />
                <br />
                <span>{errors.city}</span>
              </div>
              <div>
                <select
                  onChange={this.onChange}
                  value={this.state.temperature}
                  id="temperature"
                  className="textInput"
                >
                  <option value="">Preferred Temperature</option>
                  <option value="metric">Celcius</option>
                  <option value="imperial">Fahrenheit</option>
                  <option value="kelvin">Kelvin</option>
                </select>
                <br />
                <span>{errors.temperature}</span>
              </div>
              <div>
                <button
                  className="btn btn-secondary mt-4"
                  type="submit"
                  style={{ marginLeft: "29%" }}
                >
                  Change Settings
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

//define types with prop-types package, since we can't define in our constructor
Settings.propTypes = {
  editUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
};

//map redux state to props to access it in our component
const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors,
});

//connect our component to our redux store and export it
export default connect(mapStateToProps, { editUser })(Settings);
