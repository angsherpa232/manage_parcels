import React from "react";
import styles from "./list.module.css";

const List = props => {
  const { bikers, getAssignee, getPickupTime, getDeliveryTime } = props;

  // temporary method to check if it is user or manger, later replace with auth function
  const isBiker = () => (window.location.pathname === "/bikers" ? false : true);
  const isManager = () =>
    window.location.pathname === "/manager" ? false : true;

  return (
    <ul>
      {bikers.map(el => {
        const {
          assignee,
          origin,
          destination,
          status,
          id,
          pickupTime,
          deliveryTime
        } = el;
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
                <input
                  value={pickupTime}
                  readOnly={isBiker()}
                  type="datetime-local"
                  //isManager() was required bcoz otherwise bind will run for manager also
                  onChange={
                    isManager() && (e => getPickupTime.bind(this, id))()
                  }
                ></input>
              </p>
              <p>
                Delivery time:{" "}
                <input
                  value={deliveryTime}
                  readOnly={isBiker()}
                  type="datetime-local"
                  onChange={
                    isManager() && (e => getDeliveryTime.bind(this, id))()
                  }
                ></input>
              </p>
            </div>
          </li>
        );
      })}
    </ul>
  );
};

export default List;
