import React from "react";
import "./App.css";
import Home from "./components/Home";
import Category from "./components/Category";
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import ApplicationNavbar from "./components/ApplicationNavbar";
import Expense from "./components/Expense";

function App() {
  return (
    <Router>
      <div>
        <ApplicationNavbar />
        <Switch>
          <Route path="/home" exact={true} component={Home} />
          <Route path="/categories" exact={true} component={Category} />
          <Route path="/expenses" exact={true} component={Expense} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
