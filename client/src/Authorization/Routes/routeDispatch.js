import axios from "axios";
import jwt_decode from "jwt-decode";

//import current actions defined in state
import {
  GET_ERRORS,
  SET_CURRENT_USER,
  SET_USER_SETTINGS,
} from "../State/Others/actions";
import setAuthToken from "../State/Others/setAuthToken"; //so we can set token header as needed

//registration route that posts through axios to our backend to register out user
export const registerUser = (userData, history) => (dispatch) => {
  axios
    .post("/users/register", userData)
    //after success, push user to login page (made push to login so it makes sense when email confirmation is set up)
    .then((res) => history.push("/login"))
    .catch((err) => dispatch(setError(err))); //if error caught, then dispatch error
};

//login route that posts through axios to our backend to login our user
export const loginUser = (userData) => (dispatch) => {
  axios
    .post("/users/login", userData)
    .then((res) => {
      //set recieved data from backend as token
      const { token } = res.data;
      //set token to local storage
      localStorage.setItem("jwtToken", token);
      //send token to axios authorization header
      setAuthToken(token);
      //decode our tokens data
      const decoded = jwt_decode(token);
      //dispatch our decoded data to set our current user
      dispatch(setCurrentUser(decoded));
    })
    .catch((err) => dispatch(setError(err))); //if error caught, then dispatch error
};

//edituser route that puts through axios to our backend to allow user to change their settings
export const editUser = (userData, history) => (dispatch) => {
  axios
    .put("/users/edituser", userData)
    .then((res) => {
      dispatch(setUserSettings(res.data.user)); //dispatch response data from backend to be set as new user data
      history.push("/home");
    })
    .catch((err) => dispatch(setError(err))); //if error caught, then dispatch error
};

//logout defined to allow logout to be used in navbar
export const logoutUser = () => (dispatch) => {
  localStorage.removeItem("jwtToken");
  setAuthToken(false);
  dispatch(setCurrentUser({}));
};

//setCurrentUser defined to dispatch data to state with the correct type
export const setCurrentUser = (decoded) => {
  return {
    type: SET_CURRENT_USER,
    payload: decoded,
  };
};

//setUserSettings to dispatch data to state with correct type (difference is this does not set authorization, as users already logged in)
export const setUserSettings = (user) => {
  return {
    type: SET_USER_SETTINGS,
    payload: user,
  };
};

//setError used to dispatch any errors caught to state
export const setError = (err) => {
  return {
    type: GET_ERRORS,
    payload: err.response.data,
  };
};
