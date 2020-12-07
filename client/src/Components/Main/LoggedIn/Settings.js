import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import classnames from "classnames";

import { logoutUser } from "../../../Authorization/Tokens/authActions";
import Navigation from "./Navigation";

class Settings extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: this.props.auth.user.name,
      email: this.props.auth.user.email,
      password: "",
      password2: "",
      city: this.props.auth.user.city,
      temperature: this.props.auth.user.temperature,
      errors: {},
    };
  }

  onLogoutClick = (e) => {
    e.preventDefault();
    this.props.logoutUser();
  };

  componentWillReceiveProps(nextProps) {
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
    const User = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
      password2: this.state.password2,
      city: this.state.city,
      temperature: this.state.temperature,
    };
    this.props.editUser(User, this.props.history);
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
              <h3 className="pb-2">Settings for EasyWeather</h3>
              <div style={{ marginLeft: "13%" }}></div>
              <h5 style={{ marginLeft: "2.7rem" }}>
                Edit your settings below!
                <br />
              </h5>
            </div>
            <form noValidate onSubmit={this.onSubmit}>
              <div>
                <input
                  placeholder="Name"
                  onChange={this.onChange}
                  value={this.state.name}
                  error={errors.name}
                  id="name"
                  type="name"
                  className={classnames("", { invalid: errors.name })}
                />
                <br />
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
                  className={classnames("", { invalid: errors.email })}
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
                  className={classnames("", { invalid: errors.password })}
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
                  className={classnames("", { invalid: errors.password2 })}
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
                  className={classnames("", { invalid: errors.city })}
                />
                <br />
                <span>{errors.city}</span>
              </div>
              <div>
                <select
                  onChange={this.onChange}
                  value={this.state.temperature}
                  id="temperature"
                  className={
                    (classnames("", { invalid: errors.temperature }),
                    "textInput")
                  }
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

Settings.propTypes = {
  editUser: PropTypes.func.isRequired,
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors,
});

export default connect(mapStateToProps, { logoutUser })(Settings);
