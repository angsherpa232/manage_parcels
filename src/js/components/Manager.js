import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { setAssignee, getParcelDetail } from "../actions/index";

import List from "../components/List";
import styles from "./list.module.css";

const Manager = props => {
  let bikers = useSelector(state => state.articles);
  const dispatch = useDispatch();

  // Update the state
  const handleChange = (id, e) => {
    // Set the new assignee name in state
    dispatch(setAssignee(e.target.value));
    // Update the state with new assignee new for the chosen id
    dispatch(getParcelDetail(id));
  };

  // Update the array to be displayed as list i.e. when the biker update the timestamp
  bikers = localStorage["user"]
    ? JSON.parse(localStorage.getItem("user"))
    : bikers;

  // Get the chosen assignee from bikers list
  const getAssignee = id => {
    return (
      <select
        className={styles.btn}
        onChange={(e => handleChange.bind(this, id))()}
      >
        {bikers
          .filter(biker => biker.assignee !== "none")
          .map(biker => (
            <option key={biker.id} value={biker.assignee}>
              {biker.assignee}
            </option>
          ))}
      </select>
    );
  };

  return <List bikers={bikers} getAssignee={getAssignee} />;
};

export default Manager;
