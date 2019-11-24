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

// check if the bikers=[] is required anymore or not? :D
const initialState = {
  parcels: [],
  assignee: "none",
  isAuth: false,
  pickupTime: "",
  deliveryDate: "",
  screenRedux: null,
  error: null,
  username: null,
  password: null
};

function rootReducer(state = initialState, action) {
  if (action.type === SET_PARCELS) {
    return Object.assign({}, state, {
      parcels: state.parcels.concat(action.payload)
    });
  }

  if (action.type === DATA_LOADED) {
    return Object.assign({}, state, {
      parcels: state.parcels.concat(action.payload)
    });
  }

  if (action.type === SET_ASSIGNEE) {
    return Object.assign({}, state, {
      assignee: action.payload
    });
  }

  if (action.type === GET_PARCEL_DETAIL) {
    const unAssignedPackage = state.parcels.find(e => e.id === action.payload);
    unAssignedPackage.status = "assigned";
    unAssignedPackage.assignee = state.assignee;
    const index = state.parcels.findIndex(e => e.id === action.payload);
    const bikeCopy = [...state.parcels];
    bikeCopy[index] = unAssignedPackage;
    localStorage.setItem("parcels", JSON.stringify(bikeCopy));
    return Object.assign({}, state, {
      parcels: bikeCopy
    });
  }

  if (action.type === UPDATE_PICKUP_TIME) {
    const unAssignedPackage = state.parcels.find(e => e.id === action.payload);
    unAssignedPackage.pickupTime = state.pickupTime;
    const index = state.parcels.findIndex(e => e.id === action.payload);
    const bikeCopy = [...state.parcels];
    bikeCopy[index] = unAssignedPackage;
    localStorage.setItem("parcels", JSON.stringify(bikeCopy));
    return Object.assign({}, state, {
      parcels: bikeCopy
    });
  }

  if (action.type === LOGIN) {
    return Object.assign({}, state, {
      isAuth: true
    });
  }

  if (action.type === SET_PICKUP_TIME) {
    return Object.assign({}, state, {
      pickupTime: action.payload
    });
  }

  if (action.type === SET_DELIVERY_TIME) {
    return Object.assign({}, state, {
      deliveryTime: action.payload
    });
  }

  if (action.type === UPDATE_DELIVERY_TIME) {
    const unAssignedPackage = state.parcels.find(e => e.id === action.payload);
    unAssignedPackage.deliveryTime = state.deliveryTime;
    const index = state.parcels.findIndex(e => e.id === action.payload);
    const bikeCopy = [...state.parcels];
    bikeCopy[index] = unAssignedPackage;
    localStorage.setItem("parcels", JSON.stringify(bikeCopy));
    return Object.assign({}, state, {
      parcels: bikeCopy
    });
  }

  // Authentication
  if (action.type === SET_ROLE) {
    return Object.assign({}, state, {
      screenRedux: action.payload
    });
  }

  if (action.type === ERROR) {
    return Object.assign({}, state, {
      error: action.payload
    });
  }

  if (action.type === SETUSERNAME) {
    return Object.assign({}, state, {
      username: action.payload
    });
  }

  if (action.type === SETPASSWORD) {
    return Object.assign({}, state, {
      password: action.payload
    });
  }
  return state;
}

export default rootReducer;
