import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";

import Manager from "./Manager";
import Bikers from "./Bikers";
import { setRole, setError } from "../actions/index";
//import deleteCookie from "../utility/index";
import Login from "../components/Login";
import ErrorModal from "../components/UI/ErrorModal";
import Header from "../components/UI/Header";

function View(props) {
  const { screen, setScreen, username, password } = props;
  const dispatch = useDispatch();
  const { screenRedux, error } = useSelector(state => ({
    screenRedux: state.screenRedux,
    error: state.error
  }));

  const deleteCookie = async () => {
    try {
      await axios.get("/clear-cookie");
      dispatch(setRole("auth"));
      setScreen("auth");
    } catch (error) {
      console.log(error);
    }
  };

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
