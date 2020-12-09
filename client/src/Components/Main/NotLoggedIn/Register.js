import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import { registerUser } from "../../../Authorization/Routes/routeDispatch";
import Navigation from "./Navigation";

class Register extends Component {
  constructor() {
    super();
    this.state = {
      name: "",
      email: "",
      password: "",
      password2: "",
      city: "",
      temperature: "",
      errors: {},
    };
  }

  //if user has already been authenticated/has token in header, redirect directly to logged in home page
  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/home");
    }
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
    //create newUser object that contains the users registration data
    const newUser = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
      password2: this.state.password2,
      city: this.state.city,
      temperature: this.state.temperature,
    };
    //send registration data to route dispatcher to be sent to backend and processed
    this.props.registerUser(newUser, this.props.history);
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
              <h3 className="pb-4">Register for EasyWeather</h3>
              <div style={{ marginLeft: "13%" }}>
                <h5>
                  Already have an account?
                  <br />
                </h5>
                {/* link to move to login page */}
                <Link
                  style={{ marginLeft: "18%" }}
                  to="/login"
                  class="linkStyle"
                >
                  Click here to Log in
                </Link>
              </div>
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
                  placeholder="Email"
                  onChange={this.onChange}
                  value={this.state.email}
                  error={errors.email}
                  id="email"
                  type="email"
                />
                <br />
                <span>{errors.email}</span>
              </div>
              <div>
                <input
                  placeholder="Password"
                  onChange={this.onChange}
                  value={this.state.password}
                  error={errors.password}
                  id="password"
                  type="password"
                />
                <br />
                <span>{errors.password}</span>
              </div>
              <div>
                <input
                  placeholder="Re-enter Password"
                  onChange={this.onChange}
                  value={this.state.password2}
                  error={errors.password2}
                  id="password2"
                  type="password"
                />
                <br />
                <span>{errors.password2}</span>
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
                  style={{ marginLeft: "41%" }}
                >
                  Sign up
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
Register.propTypes = {
  registerUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
};

//map redux state to props to access it in our component
const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors,
});

//connect our component to our redux store and export it
export default connect(mapStateToProps, { registerUser })(Register);
