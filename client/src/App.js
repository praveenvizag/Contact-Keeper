import React, { Fragment } from "react";
import "./App.css";
import Navbar from "./components/layouts/Navbar";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./components/pages/Home";
import About from "./components/pages/About";
import ContactState from "./context/contacts/ContactState";
import NewpageForEdit from "./components/contacts/NewpageForEdit";
import Register from "./components/layouts/auth/Register";
import Login from "./components/layouts/auth/Login";
import AlertState from "./context/alert/AlertState";
import AuthState from "./context/auth/AuthState";
import Alerts from "./components/layouts/Alerts";
import setAuthToken from './utils/setAuthToken';
import PrivateRoute from './components/routing/PrivateRoute';
import RestComponent from './components/contacts/SpringBootRestCompoennets/RestComponent';

if(localStorage.token) {
  setAuthToken(localStorage.token);
}
function App() {
  return (
    <AuthState>
      <ContactState>
        <AlertState>
          <Router>
            <Fragment>
              <Navbar />
              <div className="container">
                <Alerts />
                <Switch>
                  <PrivateRoute exact path="/" component={Home}></PrivateRoute>
                  <Route exact path="/about" component={About}></Route>
                  <Route exact path="/register" component={Register}></Route>
                  <Route exact path="/login" component={Login}></Route>
                  <Route exact path="/getRestData" component={RestComponent}></Route>
                  <Route
                    exact
                    path="/newPage/:edit"
                    render={props => <NewpageForEdit {...props} />}
                  ></Route>
                </Switch>
              </div>
            </Fragment>
          </Router>
        </AlertState>
      </ContactState>
    </AuthState>
  );
}

export default App;
