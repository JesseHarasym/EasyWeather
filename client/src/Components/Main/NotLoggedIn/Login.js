import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import { loginUser } from "../../../Authorization/Routes/routeDispatch";
import Navigation from "./Navigation";

class Login extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      errors: {},
    };
  }

  //if user has already been authenticated/has token in header, redirect directly to logged in home page
  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/home");
    }
  }

  componentWillReceiveProps(nextProps) {
    //if user logs in successfully then push to logged in home page
    if (nextProps.auth.isAuthenticated) {
      this.props.history.push("/home");
    }
    //to recieve errors from server side validator if input fails validation test
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
    //create user object that contains the users login data
    const userData = {
      email: this.state.email,
      password: this.state.password,
    };
    //send login data to route dispatcher to be sent to backend and processed
    this.props.loginUser(userData);
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
              <h3 className="pb-4">Login to EasyWeather</h3>
              <div style={{ marginLeft: "8%" }}>
                <h5>
                  Don't have an account yet?
                  <br />
                </h5>
                {/* link to move to registration page */}
                <Link
                  style={{ marginLeft: "18%" }}
                  to="/register"
                  class="linkStyle"
                >
                  Click here to Register
                </Link>
              </div>
            </div>
            {/* base form for handling user submits */}
            <form noValidate onSubmit={this.onSubmit} className="mt-2">
              <div>
                <input
                  class="input"
                  placeholder="Email"
                  onChange={this.onChange}
                  value={this.state.email}
                  error={errors.email}
                  id="email"
                  type="email"
                />
                <br />
                <span>
                  {/* spans are used to display validation errors */}
                  {errors.email} {errors.emailnotfound}
                </span>
              </div>
              <div className="mb-3">
                <input
                  class="input"
                  placeholder="Password"
                  onChange={this.onChange}
                  value={this.state.password}
                  error={errors.password}
                  id="password"
                  type="password"
                  className="textAlign: center"
                />
                <br />
                <span>
                  {errors.password} {errors.passwordincorrect}
                </span>
              </div>
              <button
                className="btn btn-secondary mt-4"
                type="submit"
                style={{ marginLeft: "41%" }}
              >
                Login
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

//define types with prop-types package, since we can't define in our constructor
Login.propTypes = {
  loginUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
};

//map redux state to props to access it in our component
const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors,
});

//connect our component to our redux store and export it
export default connect(mapStateToProps, { loginUser })(Login);
