import { ADD_ARTICLE, SET_ASSIGNEE } from "../constants/action-types";

const initialState = {
  articles: [
    {
      id: 1,
      assignee: "ang gurung",
      origin: "kathmandu",
      destination: "berlin",
      status: "waiting"
    },
    {
      id: 2,
      assignee: "dawa",
      origin: "pokhara",
      destination: "munster",
      status: "waiting"
    },
    {
      id: 3,
      assignee: "sherpa",
      origin: "bhaktapur",
      destination: "freiburg",
      status: "assigned"
    },
    {
      id: 4,
      assignee: "ram",
      origin: "khumbu",
      destination: "frankfurt",
      status: "assinged"
    },
    {
      id: 5,
      assignee: "sam",
      origin: "janakpur",
      destination: "munich",
      status: "pickedUp"
    },
    {
      id: 6,
      assignee: "john",
      origin: "phakding",
      destination: "hamburg",
      status: "pickedUp"
    },
    {
      id: 7,
      assignee: "joy",
      origin: "namche",
      destination: "zurich",
      status: "delivered"
    },
    {
      id: 8,
      assignee: "ronay",
      origin: "butwal",
      destination: "spain",
      status: "delivered"
    },
    {
      id: 9,
      assignee: "none",
      origin: "chitwan",
      destination: "america",
      status: "unassigned"
    },
    {
      id: 10,
      assignee: "none",
      origin: "lukla",
      destination: "france",
      status: "unassigned"
    }
  ],
  remoteArticles: [],
  assignee: "none"
};

function rootReducer(state = initialState, action) {
  if (action.type === ADD_ARTICLE) {
    return Object.assign({}, state, {
      articles: state.articles.concat(action.payload)
    });
  }

  if (action.type === "DATA_LOADED") {
    return Object.assign({}, state, {
      remoteArticles: state.remoteArticles.concat(action.payload)
    });
  }

  if (action.type === SET_ASSIGNEE) {
    return Object.assign({}, state, {
      assignee: action.payload
    });
  }

  return state;
}

export default rootReducer;
