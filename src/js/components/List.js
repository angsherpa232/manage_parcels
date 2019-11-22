import React from "react";
import styles from "./list.module.css";

const List = props => {
  const { bikers, getAssignee } = props;

  return (
    <ul>
      {bikers.map(el => {
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
