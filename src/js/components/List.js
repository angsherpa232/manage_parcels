import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { setAssignee } from "../actions/index";
import styles from "./list.module.css";

const List = props => {
  const articles = useSelector(state => state.articles);
  const assignee = useSelector(state => state.assignee);
  const dispatch = useDispatch();

  const handleChange = e => {
    dispatch(setAssignee(e.target.value));
  };

  console.log("assignee from redux ", assignee);

  const getAssignee = e => (
    <select className={styles.btn} onChange={handleChange}>
      {articles
        .filter(biker => biker.assignee !== "none")
        .map(biker => (
          <option key={biker.id} value={biker.assignee}>
            {biker.assignee}
          </option>
        ))}
    </select>
  );

  return (
    <ul>
      {articles.map(el => {
        const { assignee, origin, destination, status, id } = el;
        return (
          <li key={id} className={`${styles.card} ${styles.listContent}`}>
            <h4>Parcel no: {id}</h4>
            <div className={styles.innerSection}>
              <div>
                <p>
                  Assignee:{" "}
                  <span>
                    {assignee === "none"
                      ? getAssignee()
                      : assignee.toUpperCase()}
                  </span>
                </p>
                <p>
                  Origin: <span>{origin}</span>
                </p>
              </div>
            </div>
            <div className={styles.innerSection}>
              <p>
                Destination: <span>{destination}</span>
              </p>
              <p>
                Status: <span>{status}</span>
              </p>
            </div>
          </li>
        );
      })}
    </ul>
  );
};

export default List;
