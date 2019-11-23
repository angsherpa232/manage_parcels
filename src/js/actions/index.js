import { ADD_ARTICLE, SET_ASSIGNEE } from "../constants/action-types";

export function addArticle(payload) {
  return { type: ADD_ARTICLE, payload };
}

export function setArticles(payload) {
  return { type: "SET_ARTICLES", payload };
}

// thunks allows to return function instead of plain JS object from action creator
export function getData() {
  return function(dispatch) {
    return fetch("https://jsonplaceholder.typicode.com/posts")
      .then(response => response.json())
      .then(json => {
        dispatch({ type: "DATA_LOADED", payload: json });
      });
  };
}

export function setAssignee(payload) {
  return { type: SET_ASSIGNEE, payload };
}

export function getParcelDetail(payload) {
  return { type: "GET_PARCEL_DETAIL", payload };
}

// this might be deletable in the future :D
export function getBikers(payload) {
  return { type: "GET_BIKERS", payload };
}

export function login(payload) {
  return { type: "LOGIN", payload };
}

export function setPickupTime(payload) {
  return { type: "SET_PICKUP_TIME", payload };
}

export function setDeliveryTime(payload) {
  return { type: "SET_DELIVERY_TIME", payload };
}

export function updatePickupTime(payload) {
  return { type: "UPDATE_PICKUP_TIME", payload };
}

export function updateDeliveryTime(payload) {
  return { type: "UPDATE_DELIVERY_TIME", payload };
}

// Authentication
export function setRole(payload) {
  return { type: "SET_ROLE", payload };
}

export function setError(payload) {
  console.log("action error ", payload);
  return { type: "ERROR", payload };
}
