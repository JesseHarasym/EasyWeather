//import our current actions to be used for setting state
import { SET_CURRENT_USER, SET_USER_SETTINGS } from "../Others/actions";

const isEmpty = require("is-empty");

//set initial state object for authorization to be changed dependending on user actions
const initialState = {
  isAuthenticated: false,
  user: {},
};

export default function authReducer(state = initialState, action) {
  switch (action.type) {
    case SET_CURRENT_USER:
      return {
        ...state,
        //set authentication and user data according to payload when logging in
        isAuthenticated: !isEmpty(action.payload),
        user: action.payload,
      };
    case SET_USER_SETTINGS:
      return {
        ...state,
        user: action.payload, //send user data according to payload when user edits settings
      };
    default:
      return state;
  }
}
