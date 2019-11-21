import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { setAssignee } from "../actions/index";
import styles from "./list.module.css";

const List = props => {
  const articles = useSelector(state => state.articles);
  const dispatch = useDispatch();

  const handleChange = (id, e) => {
    dispatch(setAssignee(e.target.value));
  };

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
                      ? getAssignee(id)
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
