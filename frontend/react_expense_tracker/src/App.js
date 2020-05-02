import React from "react";
import "./App.css";
import Home from "./components/Home";
import Category from "./components/Category";
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import ApplicationNavbar from "./components/ApplicationNavbar";

function App() {
  return (
    <Router>
      <div>
        <ApplicationNavbar />
        <Switch>
          <Route path="/" exact={true} component={Home} />
          <Route path="/categories" exact={true} component={Category} />
          <Route path="/expenses" exact={true} component={Category} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
