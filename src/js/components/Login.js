import React from "react";
import { useDispatch } from "react-redux";

import Card from "./UI/Card";
import { setRole, setUsername, setPassword } from "../actions/index";
import styles from "./login.module.css";

const Login = props => {
  const { auth } = props;
  const dispatch = useDispatch();

  return (
    <section className={styles.login_form}>
      <Card>
        <h2>You are not authenticated!</h2>
        <p>Please choose the role and log in to continue.</p>
        <br />
        <div className={styles.form_control}>
          <label htmlFor="role">Role: </label>
          <select
            className={styles.form_role}
            onChange={e => dispatch(setRole(e.target.value))}
          >
            <option value="none">Select</option>
            <option value="admin">Manager</option>
            <option value="user">Biker</option>
          </select>
        </div>
        <br />
        <div className={styles.form_control}>
          <label htmlFor="username">Username: </label>
        </div>
        <br />
        <div className={styles.form_control}>
          <input
            type="text"
            onChange={e => dispatch(setUsername(e.target.value))}
          />
        </div>
        <br />
        <div className={styles.form_control}>
          <label htmlFor="password">Password: </label>
          <br />
          <input
            type="password"
            onChange={e => dispatch(setPassword(e.target.value))}
          />
        </div>
        <br />
        <div className={styles.form__actions}>
          <button onClick={auth}>Login</button>
        </div>
      </Card>
    </section>
  );
};

export default Login;
