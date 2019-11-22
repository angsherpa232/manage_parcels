import React from "react";
import { useDispatch } from "react-redux";

import Card from "./UI/Card";
import styles from "./auth.module.css";

import { login } from "../actions/index";

const Auth = props => {
  const dispatch = useDispatch();

  const loginHandler = () => {
    dispatch(login(true));
  };

  return (
    <div className={styles.auth}>
      <Card>
        <h2>You are not authenticated!</h2>
        <p>Please log in to continue.</p>
        <button onClick={loginHandler}>Log In</button>
      </Card>
    </div>
  );
};

export default Auth;
