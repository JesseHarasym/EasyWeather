import axios from "axios";

//this is used to set and delete axios's authorization header dependent on if a user is logged in
const setAuthToken = (token) => {
  if (token) {
    //apply token to request if logged in
    axios.defaults.headers.common["Authorization"] = token;
  } else {
    //delete tokens authorization header if not logged in
    delete axios.defaults.headers.common["Authorization"];
  }
};

export default setAuthToken;
