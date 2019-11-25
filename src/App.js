import React, { useEffect } from "react";
import { useDispatch } from "react-redux";

import Auth from "./js/components/Auth";

import "./App.css";
import { setParcels, getData } from "./js/actions/index";

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    if (localStorage["parcels"]) {
      // Sets the parcels value  from memory if available
      dispatch(setParcels(JSON.parse(localStorage.getItem("parcels"))));
    } else {
      // If already not present in memory, fetch the parcels from server
      dispatch(getData());
    }
  }, []);

  return <Auth />;
};

export default App;
