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
  console.log("from get bikers");
  return { type: "GET_BIKERS", payload };
}

export function login(payload) {
  console.log(payload);
  return { type: "LOGIN", payload };
}

export function setPickupDate(payload) {
  console.log("pick up", payload);
  return { type: "SET_PICKUP_TIME", payload };
}
