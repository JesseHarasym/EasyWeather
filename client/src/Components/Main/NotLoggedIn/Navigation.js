import React from "react";
import { Link } from "react-router-dom";

//this is the nagivation bar used for users who are not logged in
class Navigation extends React.Component {
  //navigation has three links: Home, Login and Register
  render() {
    return (
      <nav className="navbar bg-dark">
        <Link to="/" className="btn btn-dark ml-4">
          Home
        </Link>
        <div className="float-right">
          <Link to="/login" className="btn btn-dark mr-5">
            Log In
          </Link>
          <Link to="/register" className="btn btn-dark mr-4">
            Register
          </Link>
        </div>
      </nav>
    );
  }
}

export default Navigation;
