import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import { logoutUser } from "../../../Authorization/Routes/routeDispatch";

//this is the navigation bar used for users who are logged in and authorized
class Navigation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userId: this.props.auth.user._id,
      errors: {},
    };
  }
  //allow user to logout from navbar, which will remove token from header and redirect to login page
  onLogoutClick = (e) => {
    e.preventDefault(); //stop default page redirect
    this.props.logoutUser();
  };

  //navigation has two links: Home and Settings, and one button: Logout
  render() {
    //since we only need to access user information in one place, create constant to access it
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

//define types with prop-types package, since we can't define in our constructor
Navigation.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
};

//map redux state to props to access it in our component
const mapStateToProps = (state) => ({
  auth: state.auth,
});

//connect our component to our redux store and export it
export default connect(mapStateToProps, { logoutUser })(Navigation);
