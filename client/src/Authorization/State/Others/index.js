import { combineReducers } from "redux";
import authReducer from "../Reducers/authReducer";
import errorReducer from "../Reducers/errorReducer";

export default combineReducers({
  auth: authReducer,
  errors: errorReducer,
});
