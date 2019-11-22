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
      assignee: "ang gurung",
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
      id: 11,
      assignee: "none",
      origin: "chitwan",
      destination: "america",
      status: "unassigned"
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
      assignee: "john",
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
      assignee: "kushal",
      origin: "lukla",
      destination: "france",
      status: "unassigned"
    },
    {
      id: 12,
      assignee: "kushal",
      origin: "chitwan",
      destination: "america",
      status: "delivered"
    },
    {
      id: 13,
      assignee: "sanjeev",
      origin: "chitwan",
      destination: "america",
      status: "pickedUp"
    }
  ],
  remoteArticles: [],
  assignee: "none",
  bikers: [],
  isAuth: false
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

  if (action.type === "GET_PARCEL_DETAIL") {
    const unAssignedPackage = state.articles.find(e => e.id === action.payload);
    unAssignedPackage.status = "assigned";
    unAssignedPackage.assignee = state.assignee;
    const index = state.articles.findIndex(e => e.id === action.payload);
    const bikeCopy = [...state.articles];
    bikeCopy[index] = unAssignedPackage;
    return Object.assign({}, state, {
      articles: bikeCopy
    });
  }

  // this might be deletable in the future
  if (action.type === "GET_BIKERS") {
    const bike = state.articles
      .filter(biker => biker.assignee !== "none")
      .map(biker => biker.assignee);
    const uniqueBikers = Array.from(new Set(bike));
    console.log("unique ", Array.isArray(uniqueBikers), uniqueBikers);
    return Object.assign({}, state, {
      bikers: state.bikers.concat(uniqueBikers)
    });
  }

  if (action.type === "LOGIN") {
    return Object.assign({}, state, {
      isAuth: true
    });
  }
  console.log("stt ", state);
  return state;
}

export default rootReducer;
