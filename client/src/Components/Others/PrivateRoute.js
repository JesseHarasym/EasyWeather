import React from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";

const PrivateRoute = ({ component: Component, auth, ...rest }) => (
  //renders a route and passes all props through to it
  <Route
    {...rest}
    render={(props) =>
      //checks if user is authenticated and renders component prop
      auth.isAuthenticated === true ? (
        <Component {...props} />
      ) : (
        //otherwise redirect to login page
        <Redirect to="/login" />
      )
    }
  />
);

//define types with prop-types package, since we can't define in our constructor
PrivateRoute.propTypes = {
  auth: PropTypes.object.isRequired,
};

//map redux state to props to access it in our component
const mapStateToProps = (state) => ({
  auth: state.auth,
});

//connect our component to our redux store and export it
export default connect(mapStateToProps)(PrivateRoute);
