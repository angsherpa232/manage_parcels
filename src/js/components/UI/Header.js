import React from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";

import { setRole } from "../../actions/index";
import styles from "./header.module.css";

const Header = ({ setScreen }) => {
  const screenRedux = useSelector(state => state.screenRedux);
  const username = useSelector(state => state.username);
  const dispatch = useDispatch();

  const logout = async () => {
    try {
      await axios.get("/clear-cookie");
      dispatch(setRole("auth"));
      setScreen("auth");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <header className={styles.header}>
      <div className={styles.header_title}>
        <p>
          <i class="fas fa-box-open"></i>
          <span>Manage parcels</span>
        </p>
      </div>
      <div className={styles.logout_btn}>
        <p>
          Welcome {username} to {screenRedux} portal
        </p>
        <p onClick={logout}>
          <i class="fas fa-sign-out-alt"></i> Logout
        </p>
      </div>
    </header>
  );
};

export default Header;
