import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { BrowserRouter as Router, Route } from "react-router-dom";

import Bikers from "../src/js/components/Bikers";
import Manager from "../src/js/components/Manager";
import Auth from "./js/components/Auth";

import "./App.css";
import { setArticles, getData } from "./js/actions/index";

const App = () => {
  const isAuth = useSelector(state => state.isAuth);
  const dispatch = useDispatch();

  useEffect(() => {
    if (localStorage["user"]) {
      dispatch(setArticles(JSON.parse(localStorage.getItem("user"))));
    } else {
      dispatch(getData());
    }
  }, []);

  let content = <Auth />;

  if (isAuth) {
    content = (
      // remove router as node controls the route
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
