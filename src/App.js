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
  const dispatch = useDispatch();

  const arti = [
    {
      id: 1,
      assignee: "ang gurung",
      origin: "kathmandu",
      destination: "berlin",
      status: "waiting",
      pickupTime: ""
    },
    {
      id: 2,
      assignee: "ang gurung",
      origin: "pokhara",
      destination: "munster",
      status: "waiting",
      pickupTime: ""
    },
    {
      id: 3,
      assignee: "sherpa",
      origin: "bhaktapur",
      destination: "freiburg",
      status: "assigned",
      pickupTime: ""
    },
    {
      id: 4,
      assignee: "ram",
      origin: "khumbu",
      destination: "frankfurt",
      status: "assinged",
      pickupTime: ""
    },
    {
      id: 5,
      assignee: "sam",
      origin: "janakpur",
      destination: "munich",
      status: "pickedUp",
      pickupTime: ""
    },
    {
      id: 11,
      assignee: "none",
      origin: "chitwan",
      destination: "america",
      status: "unassigned",
      pickupTime: ""
    },
    {
      id: 6,
      assignee: "john",
      origin: "phakding",
      destination: "hamburg",
      status: "pickedUp",
      pickupTime: ""
    },
    {
      id: 7,
      assignee: "john",
      origin: "namche",
      destination: "zurich",
      status: "delivered",
      pickupTime: ""
    },
    {
      id: 8,
      assignee: "ronay",
      origin: "butwal",
      destination: "spain",
      status: "delivered",
      pickupTime: ""
    },
    {
      id: 9,
      assignee: "none",
      origin: "chitwan",
      destination: "america",
      status: "unassigned",
      pickupTime: ""
    },
    {
      id: 10,
      assignee: "kushal",
      origin: "lukla",
      destination: "france",
      status: "unassigned",
      pickupTime: "2019-11-21T11:22"
    },
    {
      id: 12,
      assignee: "sanjeev",
      origin: "chitwan",
      destination: "america",
      status: "delivered",
      pickupTime: ""
    },
    {
      id: 13,
      assignee: "sanjeev",
      origin: "chitwan",
      destination: "america",
      status: "pickedUp",
      pickupTime: ""
    }
  ];

  useEffect(() => {
    if (localStorage["user"]) {
      dispatch(setArticles(JSON.parse(localStorage.getItem("user"))));
    } else {
      dispatch(setArticles(arti));
    }
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
