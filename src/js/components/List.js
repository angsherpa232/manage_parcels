import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import styles from "./list.module.css";

import { setPickupDate } from "../actions/index";

const List = props => {
  const { bikers, getAssignee } = props;

  const dispatch = useDispatch();

  const timeChange = e => {
    const dateTime = e.target.value;
    dispatch(setPickupDate(dateTime));
    console.log(dateTime);
  };

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
            <div className={styles.innerSection}>
              <p>
                Pickup time:{" "}
                <input type="datetime-local" onChange={timeChange}></input>
              </p>
              <p>
                Delivery time:{" "}
                <input type="datetime-local" onChange={timeChange}></input>
              </p>
            </div>
          </li>
        );
      })}
    </ul>
  );
};

export default List;
