import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { setAssignee, getParcelDetail } from "../actions/index";

import List from "../components/List";
import styles from "./list.module.css";

const Manager = props => {
  const articles = useSelector(state => state.articles);
  const dispatch = useDispatch();

  // Update the state
  const handleChange = (id, e) => {
    // Set the new assignee name in state
    dispatch(setAssignee(e.target.value));
    // Update the state with new assignee new for the chosen id
    dispatch(getParcelDetail(id));
  };

  // Get the chosen assignee from bikers list
  const getAssignee = id => {
    return (
      <select
        className={styles.btn}
        onChange={(e => handleChange.bind(this, id))()}
      >
        {articles
          .filter(biker => biker.assignee !== "none")
          .map(biker => (
            <option key={biker.id} value={biker.assignee}>
              {biker.assignee}
            </option>
          ))}
      </select>
    );
  };

  return <List bikers={articles} getAssignee={getAssignee} />;
};

export default Manager;
