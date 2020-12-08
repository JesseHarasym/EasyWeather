import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import classnames from "classnames";

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

  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/home");
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.auth.isAuthenticated) {
      this.props.history.push("/home");
    }
    if (nextProps.errors) {
      this.setState({
        errors: nextProps.errors,
      });
    }
  }

  onChange = (e) => {
    this.setState({ [e.target.id]: e.target.value });
  };

  onSubmit = (e) => {
    e.preventDefault();
    const userData = {
      email: this.state.email,
      password: this.state.password,
    };
    this.props.loginUser(userData);
  };

  render() {
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
                <Link
                  style={{ marginLeft: "18%" }}
                  to="/register"
                  class="linkStyle"
                >
                  Click here to Register
                </Link>
              </div>
            </div>
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
                  className={classnames("", {
                    invalid: errors.email || errors.emailnotfound,
                  })}
                />
                <br />
                <span>
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
                  className={classnames(
                    "",
                    { invalid: errors.password || errors.passwordincorrect },
                    "textAlign: center"
                  )}
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

Login.propTypes = {
  loginUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors,
});

export default connect(mapStateToProps, { loginUser })(Login);
