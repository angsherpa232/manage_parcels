import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";

import Manager from "./Manager";
import Bikers from "./Bikers";
import { setRole, setError } from "../actions/index";
import Login from "../components/Login";
import ErrorModal from "../components/UI/ErrorModal";
import { managerList, bikerList } from "./UI/listOfMembers";
console.log("mglist, bklist ", managerList, bikerList);
function View(props) {
  const { screen, setScreen } = props;
  const dispatch = useDispatch();
  const { username, screenRedux } = useSelector(state => ({
    username: state.username,
    screenRedux: state.screenRedux
  }));

  const [data, setData] = useState();

  const deleteCookie = async () => {
    try {
      await axios.get("/clear-cookie");
      setScreen("auth");
    } catch (error) {
      console.log(error);
    }
  };

  const getData = async () => {
    try {
      const res = await axios.get("/get-data");
      console.log(res.data);
      setData(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const viewBasedOnRole = screen => {
    let view;
    console.log("screenRedux is ", screenRedux);
    if (
      screenRedux === "admin" &&
      managerList.includes(username) &&
      screen === "admin"
    ) {
      console.log("if ");
      view = <Manager />;
    } else if (
      screenRedux === "user" &&
      bikerList.includes(username) &&
      screen === "user"
    ) {
      console.log("else if ");
      view = <Bikers />;
    } else {
      console.log("else ");
      view = (
        <ErrorModal onClose={() => dispatch(setError(null))}>
          {"Please check your role and try again."}
        </ErrorModal>
      );
    }
    return view;
  };

  return (
    <div>
      <p>{screen}</p>
      {viewBasedOnRole(screen)}
      <p>{data}</p>
      <button onClick={getData}>Get Data</button>
      <button onClick={deleteCookie}>Logout</button>
    </div>
  );
}

function Auth() {
  const [screen, setScreen] = useState("auth");

  const { username, password, error } = useSelector(state => ({
    username: state.username,
    password: state.password,
    error: state.error
  }));
  console.log("error is ", error);
  const dispatch = useDispatch();

  const auth = async () => {
    try {
      const res = await axios.get("/authenticate", {
        auth: { username, password }
      });

      if (res.data.screen !== undefined) {
        //dispatch(setRole(res.data.screen));
        setScreen(res.data.screen);
      }
    } catch (error) {
      dispatch(setError(error.message));
    }
  };

  const readCookie = async () => {
    try {
      const res = await axios.get("/read-cookie");

      if (res.data.screen !== undefined) {
        dispatch(setRole(res.data.screen));
        setScreen(res.data.screen);
      }
    } catch (error) {
      setScreen("auth");
      dispatch(setError(error.message));
      dispatch(setRole("auth"));
    }
  };

  useEffect(() => {
    readCookie();
  }, []);

  return (
    <>
      {screen === "auth" && !error ? (
        <Login auth={auth} />
      ) : (
        <>
          {error && (
            <ErrorModal onClose={() => dispatch(setError(null))}>
              {error}
            </ErrorModal>
          )}
          <View screen={screen} setScreen={setScreen} />
        </>
      )}
    </>
  );
}

export default Auth;
