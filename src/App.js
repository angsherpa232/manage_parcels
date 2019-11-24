import React, { useEffect } from "react";
import { useDispatch } from "react-redux";

import Auth from "./js/components/Auth";

import "./App.css";
import { setParcels, getData } from "./js/actions/index";

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    if (localStorage["parcels"]) {
      dispatch(setParcels(JSON.parse(localStorage.getItem("parcels"))));
    } else {
      dispatch(getData());
    }
  }, []);

  return <Auth />;
};

export default App;
