import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import jwt_decode from "jwt-decode";
import { Provider } from "react-redux";

import {
  setCurrentUser,
  logoutUser,
} from "./Authorization/Routes/routeDispatch";
import setAuthToken from "./Authorization/State/Others/setAuthToken";
import store from "./Authorization/State/Others/store";
import HomeNotLoggedIn from "./Components/Main/NotLoggedIn/Home";
import Register from "./Components/Main/NotLoggedIn/Register";
import Login from "./Components/Main/NotLoggedIn/Login";
import PrivateRoute from "./Components/Others/PrivateRoute";
import Home from "./Components/Main/LoggedIn/Home";
import Settings from "./Components/Main/LoggedIn/Settings";

class App extends Component {
  render() {
    return (
      //provide used to pass the redux store data to the applicatiob
      <Provider store={store}>
        <Router>
          <div className="App">
            <Route exact path="/" component={HomeNotLoggedIn} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/login" component={Login} />
            {/* switch used for private routes that can only be accessed by a user who has logged in */}
            <Switch>
              <PrivateRoute exact path="/settings" component={Settings} />
              <PrivateRoute exact path="/home" component={Home} />
            </Switch>
          </div>
        </Router>
      </Provider>
    );
  }
}

//if there's a token currently stored in localStorage
if (localStorage.jwtToken) {
  //set that jwtToken to a token variable
  const token = localStorage.jwtToken;
  //send that token to be set to our header
  setAuthToken(token);
  //decode the payload data of the token and set to a variable
  const decoded = jwt_decode(token);
  //dispatch the token with our store, and set the current user to the decoded token
  store.dispatch(setCurrentUser(decoded));
  //check current time in seconds
  const currentTime = Date.now() / 1000;
  //compare the token expire time against the current time
  if (decoded.exp < currentTime) {
    //if the token is expred, logout the user and redirect them
    store.dispatch(logoutUser());
    window.location.href = "./login";
  }
}

export default App;
