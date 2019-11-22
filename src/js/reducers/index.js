import { ADD_ARTICLE, SET_ASSIGNEE } from "../constants/action-types";

const initialState = {
  articles: [],
  remoteArticles: [],
  assignee: "none",
  bikers: [],
  isAuth: false,
  pickupDate: "",
  DeliveryDate: ""
};

function rootReducer(state = initialState, action) {
  if (action.type === ADD_ARTICLE) {
    return Object.assign({}, state, {
      articles: state.articles.concat(action.payload)
    });
  }

  if (action.type === "SET_ARTICLES") {
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
    localStorage.setItem("user", JSON.stringify(bikeCopy));
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

  if (action.type === "SET_PICKUP_TIME") {
    return Object.assign({}, state, {
      pickupDate: action.payload
    });
  }

  return state;
}

export default rootReducer;
