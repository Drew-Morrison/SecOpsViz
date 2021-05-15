import React, { Component } from "react";
import {} from "reactstrap";
import "./App.css";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
  Link,
} from "react-router-dom";
import HomePage from "./Home";
import InfoPage from "./info";
import Navigation from "./Components/Navigation";
import HostComVizPage from "./Components/HostComVizPage";
import PortTrafficVizPage from "./Components/PortTrafficVizPage";
import ProfilePage from "./profile"

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dashboards: ["Dashboard 1", "Dashboard 2", "Dashboard 3"],
    };
  }

  render() {
    return (
      <div className="overall">
        <Router>
          <Navigation />
          <Switch>
            <Route path="/home" component={HomePage} />
            <Route path="/info" component={InfoPage} />
            <Route path="/profile" component={ProfilePage} />
            <Route
              exact
              path="/hostcomvizpage"
              children={<HostComVizPage dashboards={this.state.dashboards} />}
            />
            <Route
              exact
              path="/porttrafficvizpage"
              children={
                <PortTrafficVizPage dashboards={this.state.dashboards} />
              }
            />
            <Redirect to="/home" component={HomePage} />
          </Switch>
        </Router>
        <Footer />
      </div>
    );
  }
}

class Footer extends Component {
  render() {
    return (
      <footer>
        <p className="footer_text"> Fierce Null Set - iSchool Capstone 2021 </p>
      </footer>
    );
  }
}

export default App;
