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
  // Either takes the initial parcels state or assignee updated by manager

  let { parcels, pickupTime, screenRedux } = useSelector(state => ({
    parcels: state.parcels,
    pickupTime: state.pickupTime,
    screenRedux: state.screenRedux
  }));

  parcels = localStorage["parcels"]
    ? JSON.parse(localStorage.getItem("parcels"))
    : parcels;

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

  const specificBiker = parcels.filter(biker => {
    const { assignee } = biker;
    return assignee === "kushal";
  });

  return (
    <List
      bikers={specificBiker}
      getPickupTime={getPickupTime}
      pickupTime={pickupTime}
      getDeliveryTime={getDeliveryTime}
      screen={screenRedux}
    />
  );
};

export default Bikers;
