import React from "react";
import { useSelector, useDispatch } from "react-redux";
import List from "../components/List";
import {
  setPickupTime,
  updatePickupTime,
  setDeliveryTime,
  updateDeliveryTime
} from "../actions/index";

// Controls the bikers functionality such as updating the timestamp
const Bikers = props => {
  const dispatch = useDispatch();

  let { parcels, pickupTime, screenRedux, username } = useSelector(state => ({
    parcels: state.parcels,
    pickupTime: state.pickupTime,
    screenRedux: state.screenRedux,
    username: state.username
  }));
  // Check if parcels are already in the memory or not
  parcels = localStorage["parcels"]
    ? JSON.parse(localStorage.getItem("parcels"))
    : parcels;

  // Helper function to get the delivery time
  const getPickupTime = (id, e) => {
    const dateTime = e.target.value;
    dispatch(setPickupTime(dateTime));
    dispatch(updatePickupTime(id));
  };

  // Helper function to get the delivery time
  const getDeliveryTime = (id, e) => {
    const dateTime = e.target.value;
    dispatch(setDeliveryTime(dateTime));
    dispatch(updateDeliveryTime(id));
  };

  const specificBiker = parcels.filter(biker => {
    const { assignee } = biker;
    return assignee === username;
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
