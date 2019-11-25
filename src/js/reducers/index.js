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

// Helper function to get the specific package
const findSpecificParcel = (state, action) => {
  const chosenPackage = state.parcels.find(e => e.id === action.payload);
  return chosenPackage;
};

// Helper function to update the specific package
const udpatePackage = (state, action, toBeUpdatedPackage) => {
  const index = state.parcels.findIndex(e => e.id === action.payload);
  const bikeCopy = [...state.parcels];
  bikeCopy[index] = toBeUpdatedPackage;
  localStorage.setItem("parcels", JSON.stringify(bikeCopy));
  return Object.assign({}, state, {
    parcels: bikeCopy
  });
};

function rootReducer(state = initialState, action) {
  switch (action.type) {
    case SET_PARCELS: {
      return { ...state, parcels: state.parcels.concat(action.payload) };
    }
    case DATA_LOADED: {
      return { ...state, parcels: state.parcels.concat(action.payload) };
    }
    case SET_ASSIGNEE: {
      return { ...state, assignee: action.payload };
    }

    case GET_PARCEL_DETAIL: {
      const unAssignedPackage = findSpecificParcel(state, action);
      unAssignedPackage.status = "assigned";
      unAssignedPackage.assignee = state.assignee;
      return udpatePackage(state, action, unAssignedPackage);
    }

    case UPDATE_PICKUP_TIME: {
      const selectedPackage = findSpecificParcel(state, action);
      selectedPackage.pickupTime = state.pickupTime;
      return udpatePackage(state, action, selectedPackage);
    }

    case LOGIN: {
      return { ...state, isAuth: true };
    }

    case SET_PICKUP_TIME: {
      return { ...state, pickupTime: action.payload };
    }

    case SET_DELIVERY_TIME: {
      return { ...state, deliveryTime: action.payload };
    }

    case UPDATE_DELIVERY_TIME: {
      const selectedPackage = findSpecificParcel(state, action);
      selectedPackage.deliveryTime = state.deliveryTime;
      return udpatePackage(state, action, selectedPackage);
    }

    // Authentication
    case SET_ROLE: {
      return { ...state, screenRedux: action.payload };
    }

    case ERROR: {
      return { ...state, error: action.payload };
    }

    case SETUSERNAME: {
      return { ...state, username: action.payload };
    }

    case SETPASSWORD: {
      return { ...state, password: action.payload };
    }

    default:
      return state;
  }
}

export default rootReducer;
