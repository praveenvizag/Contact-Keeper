import React, { Fragment,useContext } from "react";
import "./App.css";
import Navbar from "./components/layouts/Navbar";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./components/pages/Home";
import About from "./components/pages/About";
import ContactState from "./context/contacts/ContactState";
import NewpageForEdit from "./components/contacts/NewpageForEdit";
import ContactContext from './context/contacts/contactContext';

function App() {
  return (
    <ContactState>
      <Router>
        <Fragment>
          <Navbar />
          <div className="container">
            <Switch>
              <Route exact path="/" component={Home}></Route>
              <Route exact path="/about" component={About}></Route>
              <Route
                exact
                path="/newPage/:edit"
                render={props => <NewpageForEdit {...props} />}
              ></Route>
            </Switch>
          </div>
        </Fragment>
      </Router>
    </ContactState>
  );
}

export default App;
