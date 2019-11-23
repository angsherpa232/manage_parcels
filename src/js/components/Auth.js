import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";

import Manager from "./Manager";
import Bikers from "./Bikers";
import { setRole, setError } from "../actions/index";
import Login from "../components/Login";
import ErrorModal from "../components/UI/ErrorModal";

function View(props) {
  const { screen, setScreen } = props;

  const screenRedux = useSelector(state => state.screenRedux);
  console.log("the screen is ttt", screen, screenRedux);

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
    if (screen === "admin") {
      view = <Manager />;
    } else if (screen === "user") {
      view = <Bikers />;
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
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();

  const dispatch = useDispatch();
  const error = useSelector(state => state.error);

  const auth = async () => {
    try {
      const res = await axios.get("/authenticate", {
        auth: { username, password }
      });

      if (res.data.screen !== undefined) {
        dispatch(setRole(res.data.screen));
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

  const clearError = () => dispatch(setError(null));

  useEffect(() => {
    readCookie();
  }, []);

  return (
    <>
      {screen === "auth" && !error ? (
        <Login
          setUsername={setUsername}
          setPassword={setPassword}
          auth={auth}
        />
      ) : (
        <>
          {error && <ErrorModal onClose={clearError}>{error}</ErrorModal>}
          <View screen={screen} setScreen={setScreen} />
        </>
      )}
    </>
  );
}

export default Auth;
