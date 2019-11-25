import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";

import Manager from "./Manager";
import Bikers from "./Bikers";
import { setRole, setError, setUsername } from "../actions/index";
import Login from "../components/Login";
import ErrorModal from "../components/UI/ErrorModal";
import Header from "../components/UI/Header";

// Determines which screen to render (Login or Manager or Bikers)
function View(props) {
  const { screen, setScreen, username, password } = props;
  const dispatch = useDispatch();
  const { screenRedux, error } = useSelector(state => ({
    screenRedux: state.screenRedux,
    error: state.error
  }));

  // Delete the cookie
  const deleteCookie = async () => {
    try {
      await axios.get("/clear-cookie");
      dispatch(setRole("auth"));
      setScreen("auth");
    } catch (error) {
      console.log(error);
    }
  };

  // Determines which screen to present based on role
  const viewBasedOnRole = (screen, username, password) => {
    let view;
    if (screenRedux === "manager" && screen === "manager") {
      view = <Manager />;
    } else if (screenRedux === "biker" && screen === "biker") {
      view = <Bikers />;
    } else if (!error && username && password && screenRedux === "auth") {
      view = (
        <ErrorModal onClose={deleteCookie}>
          {"Please select valid role or check for typos and try again."}
        </ErrorModal>
      );
    }

    return view;
  };

  return <div>{viewBasedOnRole(screen, username, password)}</div>;
}

// Communicates with server based on entered credentials
function Auth() {
  const [screen, setScreen] = useState("auth");

  const { username, password, error } = useSelector(state => ({
    username: state.username,
    password: state.password,
    error: state.error
  }));
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

  // Read the cookie and update the state to support reload feature
  const readCookie = async () => {
    try {
      const res = await axios.get("/read-cookie");

      if (res.data.screen !== undefined && res.data.name !== undefined) {
        dispatch(setRole(res.data.screen));
        dispatch(setUsername(res.data.name));
        setScreen(res.data.screen);
      }
    } catch (error) {
      setScreen("auth");
      dispatch(setError(error.message));
      dispatch(setRole("auth"));
    }
  };

  // After each reload checks if the user is already logged in or not
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
              {`${error}
              hint: Check for typos or make sure you are a authorized user.`}
            </ErrorModal>
          )}
          <Header setScreen={setScreen} />
          <View
            screen={screen}
            setScreen={setScreen}
            username={username}
            password={password}
          />
        </>
      )}
    </>
  );
}

export default Auth;
