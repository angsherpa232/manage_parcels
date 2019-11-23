import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { BrowserRouter as Router, Route } from "react-router-dom";

import Bikers from "../src/js/components/Bikers";
import Manager from "../src/js/components/Manager";
import Auth from "./js/components/Auth";

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
      pickupTime: "",
      deliveryTime: ""
    },
    {
      id: 2,
      assignee: "ang gurung",
      origin: "pokhara",
      destination: "munster",
      status: "waiting",
      pickupTime: "",
      deliveryTime: ""
    },
    {
      id: 3,
      assignee: "sherpa",
      origin: "bhaktapur",
      destination: "freiburg",
      status: "assigned",
      pickupTime: "",
      deliveryTime: ""
    },
    {
      id: 4,
      assignee: "ram",
      origin: "khumbu",
      destination: "frankfurt",
      status: "assinged",
      pickupTime: "",
      deliveryTime: ""
    },
    {
      id: 5,
      assignee: "sam",
      origin: "janakpur",
      destination: "munich",
      status: "pickedUp",
      pickupTime: "",
      deliveryTime: ""
    },
    {
      id: 11,
      assignee: "none",
      origin: "chitwan",
      destination: "america",
      status: "unassigned",
      pickupTime: "",
      deliveryTime: ""
    },
    {
      id: 6,
      assignee: "john",
      origin: "phakding",
      destination: "hamburg",
      status: "pickedUp",
      pickupTime: "",
      deliveryTime: ""
    },
    {
      id: 7,
      assignee: "john",
      origin: "namche",
      destination: "zurich",
      status: "delivered",
      pickupTime: "",
      deliveryTime: ""
    },
    {
      id: 8,
      assignee: "ronay",
      origin: "butwal",
      destination: "spain",
      status: "delivered",
      pickupTime: "",
      deliveryTime: ""
    },
    {
      id: 9,
      assignee: "none",
      origin: "chitwan",
      destination: "america",
      status: "unassigned",
      pickupTime: "",
      deliveryTime: ""
    },
    {
      id: 10,
      assignee: "kushal",
      origin: "lukla",
      destination: "france",
      status: "unassigned",
      pickupTime: "",
      deliveryTime: ""
    },
    {
      id: 12,
      assignee: "sanjeev",
      origin: "chitwan",
      destination: "america",
      status: "delivered",
      pickupTime: "",
      deliveryTime: ""
    },
    {
      id: 13,
      assignee: "sanjeev",
      origin: "chitwan",
      destination: "america",
      status: "pickedUp",
      pickupTime: "",
      deliveryTime: ""
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
