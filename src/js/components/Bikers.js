import React from "react";
import { useSelector, useDispatch } from "react-redux";
import List from "../components/List";
import {
  setPickupTime,
  updatePickupTime,
  setDeliveryTime,
  updateDeliveryTime
} from "../actions/index";

const Bikers = props => {
  const dispatch = useDispatch();
  // Either takes the initial articles state or assignee updated by manager
  let bikers = useSelector(state => state.articles);
  let pickupTime = useSelector(state => state.pickupTime);

  bikers = localStorage["user"]
    ? JSON.parse(localStorage.getItem("user"))
    : bikers;

  const getPickupTime = (id, e) => {
    const dateTime = e.target.value;
    dispatch(setPickupTime(dateTime));
    dispatch(updatePickupTime(id));
  };

  const getDeliveryTime = (id, e) => {
    const dateTime = e.target.value;
    dispatch(setDeliveryTime(dateTime));
    dispatch(updateDeliveryTime(id));
  };

  const specificBiker = bikers.filter(biker => {
    const { assignee } = biker;
    return assignee === "kushal";
  });

  return (
    <List
      bikers={specificBiker}
      getPickupTime={getPickupTime}
      pickupTime={pickupTime}
      getDeliveryTime={getDeliveryTime}
    />
  );
};

export default Bikers;
