import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import { logoutUser } from "../../../Authorization/Tokens/authActions";

class Settings extends Component {
  onLogoutClick = (e) => {
    e.preventDefault();
    this.props.logoutUser();
  };

  render() {
    const { user } = this.props.auth;
    return (
      <div>
        <nav className="navbar bg-dark">
          <Link to="/home" className="btn btn-dark ml-4">
            Home
          </Link>
          <h4 style={{ marginLeft: "10rem" }}>
            Hey {user.name.split(" ")[0]}, welcome to EasyWeather!
          </h4>
          <div className="float-right">
            <Link to="/settings" className="btn btn-dark ml-4 mr-4">
              Settings
            </Link>
            <button onClick={this.onLogoutClick} className="btn btn-dark mr-4">
              Logout
            </button>
          </div>
        </nav>
      </div>
    );
  }
}

Settings.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { logoutUser })(Settings);
