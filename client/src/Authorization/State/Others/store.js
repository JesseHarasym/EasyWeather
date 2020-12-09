import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import rootReducer from "../Reducers/rootReducer";

const initialState = {};
const middleware = [thunk];

//store to send state to our components
const store = createStore(
  //pass rootReducer which is a combination of authReducer and errorReducer
  rootReducer,
  initialState, //define initial state to our store
  //we apply middleware so that we can preform asynchronous actions
  compose(applyMiddleware(...middleware))
);

export default store;
