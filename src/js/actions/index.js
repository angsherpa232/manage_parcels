import { ADD_ARTICLE, SET_ASSIGNEE } from "../constants/action-types";

export function addArticle(payload) {
  return { type: ADD_ARTICLE, payload };
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
