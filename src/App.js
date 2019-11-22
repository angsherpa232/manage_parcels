import React from "react";
import { useSelector } from "react-redux";
import { BrowserRouter as Router, Route } from "react-router-dom";

import Bikers from "../src/js/components/Bikers";
import Manager from "../src/js/components/Manager";
import Auth from "../src/js/components/Auth";

import "./App.css";

const App = () => {
  const isAuth = useSelector(state => state.isAuth);

  let content = <Auth />;

  if (isAuth) {
    content = (
      <Router>
        <div>
          <h2>Articles</h2>
          <Route path="/login" component={Auth}></Route>
          <Route path="/bikers" component={Bikers}></Route>
          <Route path="/manager" component={Manager}></Route>
        </div>
      </Router>
    );
  }

  return content;
};

export default App;
