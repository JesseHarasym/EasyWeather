import { combineReducers } from "redux";
import authReducer from "./authReducer";
import errorReducer from "./errorReducer";

//combine reducers so more easily scalable as reducers are added to application
export default combineReducers({
  auth: authReducer,
  errors: errorReducer,
});
