import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import List from "../components/List";
import { setPickupTime, updatePickupTime } from "../actions/index";

const Bikers = props => {
  const dispatch = useDispatch();
  // Either takes the initial articles state or assignee updated by manager
  let bikers = useSelector(state => state.articles);
  bikers = localStorage["user"]
    ? JSON.parse(localStorage.getItem("user"))
    : bikers;

  const getTime = (id, e) => {
    const dateTime = e.target.value;
    console.log("id biker ", id);
    dispatch(setPickupTime(dateTime));
    dispatch(updatePickupTime(id));
  };

  const specificBiker = bikers.filter(biker => {
    const { assignee } = biker;
    return assignee === "kushal";
  });

  return <List bikers={specificBiker} getTime={getTime} />;
};

export default Bikers;
