import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { setAssignee, getParcelDetail } from "../actions/index";

import List from "../components/List";
import styles from "./list.module.css";

const Manager = props => {
  let { parcels, screenRedux } = useSelector(state => ({
    parcels: state.parcels,
    screenRedux: state.screenRedux
  }));

  const dispatch = useDispatch();

  // Update the state
  const handleChange = (id, e) => {
    // Set the new assignee name in state
    dispatch(setAssignee(e.target.value));
    // Update the state with new assignee new for the chosen id
    dispatch(getParcelDetail(id));
  };

  // Update the array to be displayed as list i.e. when the biker update the timestamp
  parcels = localStorage["parcels"]
    ? JSON.parse(localStorage.getItem("parcels"))
    : parcels;

  // Get the chosen assignee from bikers list
  const getAssignee = id => {
    return (
      <select
        className={styles.btn}
        onChange={(e => handleChange.bind(this, id))()}
      >
        {[
          ...new Set(
            parcels
              .filter((e, index) => e.assignee !== "none")
              .map(e => e.assignee)
          )
        ].map(biker => (
          <option key={biker.id} value={biker}>
            {biker}
          </option>
        ))}
      </select>
    );
  };

  return (
    <List bikers={parcels} getAssignee={getAssignee} screen={screenRedux} />
  );
};

export default Manager;
