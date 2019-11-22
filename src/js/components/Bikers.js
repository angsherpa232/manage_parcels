import React from "react";
import { useSelector, useDispatch } from "react-redux";
import List from "../components/List";

const Bikers = props => {
  let bikers = useSelector(state => state.articles);
  bikers = localStorage["user"]
    ? JSON.parse(localStorage.getItem("user"))
    : bikers;

  const specificBiker = bikers.filter(biker => {
    const { assignee } = biker;
    return assignee === "kushal";
  });

  return <List bikers={specificBiker} />;
};

export default Bikers;
