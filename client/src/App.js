import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import jwt_decode from "jwt-decode";
import setAuthToken from "./Authorization/Tokens/setAuthToken";
import { setCurrentUser, logoutUser } from "./Authorization/Tokens/authActions";
import { Provider } from "react-redux";
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
      <Provider store={store}>
        <Router>
          <div className="App">
            <Route exact path="/" component={HomeNotLoggedIn} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/login" component={Login} />
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

if (localStorage.jwtToken) {
  const token = localStorage.jwtToken;
  setAuthToken(token);
  const decoded = jwt_decode(token);
  store.dispatch(setCurrentUser(decoded));
  const currentTime = Date.now() / 1000;
  if (decoded.exp < currentTime) {
    store.dispatch(logoutUser());
    window.location.href = "./login";
  }
}

export default App;
