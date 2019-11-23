import React, { useState, useEffect } from "react";
import Manager from "../src/js/components/Manager";
import Bikers from "../src/js/components/Bikers";

import { useSelector, useDispatch } from "react-redux";
import { setRole } from "./js/actions/index";
import axios from "axios";

function View(props) {
  const { screen, setScreen } = props;

  const screenRedux = useSelector(state => state.screenRedux);
  console.log("the screen is ttt", screen, screenRedux);

  const [data, setData] = useState();

  const deleteCookie = async () => {
    try {
      await axios.get("/clear-cookie");
      setScreen("auth");
    } catch (e) {
      console.log(e);
    }
  };

  const getData = async () => {
    try {
      const res = await axios.get("/get-data");
      console.log(res.data);
      setData(res.data);
    } catch (e) {
      console.log(e);
    }
  };

  const viewBasedOnRole = screen => {
    let view;
    if (screen === "admin") {
      view = <Manager screen={screen} />;
    } else if (screen === "user") {
      view = <Bikers screen={screen} />;
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

function Test() {
  const [screen, setScreen] = useState("auth");
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();

  const dispatch = useDispatch();

  const auth = async () => {
    try {
      const res = await axios.get("/authenticate", {
        auth: { username, password }
      });

      if (res.data.screen !== undefined) {
        setScreen(res.data.screen);
        dispatch(setRole(res.data.screen));
      }
    } catch (e) {
      console.log(e);
    }
  };

  const readCookie = async () => {
    try {
      const res = await axios.get("/read-cookie");

      if (res.data.screen !== undefined) {
        setScreen(res.data.screen);
        dispatch(setRole(res.data.screen));
      }
    } catch (e) {
      setScreen("auth");
      dispatch(setRole("auth"));
      console.log(e);
    }
  };

  useEffect(() => {
    readCookie();
  }, []);

  return (
    <div className="App">
      {screen === "auth" ? (
        <div>
          <label>Username: </label>
          <br />
          <input type="text" onChange={e => setUsername(e.target.value)} />
          <br />
          <label>Password: </label>
          <br />
          <input type="password" onChange={e => setPassword(e.target.value)} />
          <br />
          <button onClick={auth}>Login</button>
        </div>
      ) : (
        <View screen={screen} setScreen={setScreen} />
      )}
    </div>
  );
}

export default Test;
