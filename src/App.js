import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { BrowserRouter as Router, Route } from "react-router-dom";

import Bikers from "../src/js/components/Bikers";
import Manager from "../src/js/components/Manager";
import Auth from "../src/js/components/Auth";

import "./App.css";
import { setArticles } from "./js/actions/index";

const App = () => {
  const isAuth = useSelector(state => state.isAuth);
  const articles = useSelector(state => state.articles);
  const dispatch = useDispatch();

  const arti = [
    {
      id: 1,
      assignee: "ang gurung",
      origin: "kathmandu",
      destination: "berlin",
      status: "waiting"
    },
    {
      id: 2,
      assignee: "ang gurung",
      origin: "pokhara",
      destination: "munster",
      status: "waiting"
    },
    {
      id: 3,
      assignee: "sherpa",
      origin: "bhaktapur",
      destination: "freiburg",
      status: "assigned"
    },
    {
      id: 4,
      assignee: "ram",
      origin: "khumbu",
      destination: "frankfurt",
      status: "assinged"
    },
    {
      id: 5,
      assignee: "sam",
      origin: "janakpur",
      destination: "munich",
      status: "pickedUp"
    },
    {
      id: 11,
      assignee: "none",
      origin: "chitwan",
      destination: "america",
      status: "unassigned"
    },
    {
      id: 6,
      assignee: "john",
      origin: "phakding",
      destination: "hamburg",
      status: "pickedUp"
    },
    {
      id: 7,
      assignee: "john",
      origin: "namche",
      destination: "zurich",
      status: "delivered"
    },
    {
      id: 8,
      assignee: "ronay",
      origin: "butwal",
      destination: "spain",
      status: "delivered"
    },
    {
      id: 9,
      assignee: "none",
      origin: "chitwan",
      destination: "america",
      status: "unassigned"
    },
    {
      id: 10,
      assignee: "kushal",
      origin: "lukla",
      destination: "france",
      status: "unassigned"
    },
    {
      id: 12,
      assignee: "kushal",
      origin: "chitwan",
      destination: "america",
      status: "delivered"
    },
    {
      id: 13,
      assignee: "sanjeev",
      origin: "chitwan",
      destination: "america",
      status: "pickedUp"
    }
  ];

  useEffect(() => {
    dispatch(setArticles(arti));
  }, []);

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
