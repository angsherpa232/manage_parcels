import React from "react";
import { useSelector } from "react-redux";
import styles from "./list.module.css";

const List = props => {
  const articles = useSelector(state => state.articles);

  const getAssignee = e => (
    <button
      className={styles.btn}
      onClick={e => {
        console.log("id ", e.target.value);
      }}
    >
      assign
    </button>
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
