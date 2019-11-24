import {
  SET_ASSIGNEE,
  SET_PARCELS,
  GET_PARCEL_DETAIL,
  UPDATE_PICKUP_TIME,
  LOGIN,
  SET_PICKUP_TIME,
  SET_DELIVERY_TIME,
  UPDATE_DELIVERY_TIME,
  SET_ROLE,
  ERROR,
  SETUSERNAME,
  SETPASSWORD,
  DATA_LOADED
} from "../constants/action-types";

export function setParcels(payload) {
  return { type: SET_PARCELS, payload };
}

// thunks allows to return function instead of plain JS object from action creator
export function getData() {
  return function(dispatch) {
    return fetch("/get-data")
      .then(response => response.json())
      .then(json => {
        dispatch({ type: DATA_LOADED, payload: json });
      })
      .catch(error => console.log("err ", error));
  };
}

export function setAssignee(payload) {
  return { type: SET_ASSIGNEE, payload };
}

export function getParcelDetail(payload) {
  return { type: GET_PARCEL_DETAIL, payload };
}

export function login(payload) {
  return { type: LOGIN, payload };
}

export function setPickupTime(payload) {
  return { type: SET_PICKUP_TIME, payload };
}

export function setDeliveryTime(payload) {
  return { type: SET_DELIVERY_TIME, payload };
}

export function updatePickupTime(payload) {
  return { type: UPDATE_PICKUP_TIME, payload };
}

export function updateDeliveryTime(payload) {
  return { type: UPDATE_DELIVERY_TIME, payload };
}

// Authentication
export function setRole(payload) {
  return { type: SET_ROLE, payload };
}

export function setError(payload) {
  return { type: ERROR, payload };
}

export function setUsername(payload) {
  return { type: SETUSERNAME, payload };
}

export function setPassword(payload) {
  return { type: SETPASSWORD, payload };
}
