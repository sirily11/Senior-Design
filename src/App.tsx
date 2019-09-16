import React, { Component } from "react";
import "./App.css";
import { HashRouter as Router, Route, Link } from "react-router-dom";
import {
  spring,
  AnimatedRoute,
  AnimatedSwitch
} from "./components/plugins/react-router-transition";
import { HomePage } from "./components/pages/HomePage";

class App extends Component {
  render() {
    return (
      <Router>
       
                  <AnimatedSwitch
                    atEnter={{ opacity: 0 }}
                    atLeave={{ opacity: 0 }}
                    atActive={{ opacity: 1 }}
                    className="switch-wrapper"
                  >
                    <Route exact path="/" component={HomePage} />
                   
                  </AnimatedSwitch>
            
      </Router>
    );
  }
}

export default App;
