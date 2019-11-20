import React from "react";
import { useSelector } from "react-redux";
import styles from "./list.module.css";

const List = props => {
  const articles = useSelector(state => state.articles);
  return (
    <ul>
      {articles.map(el => {
        const { assignee, origin, destination, status, id } = el;
        return (
          <li
            key={id}
            style={{
              display: "flex",
              justifyContent: "space-evenly",
              alignItems: "center"
            }}
            className={styles.card}
          >
            <h4>Parcel no: {id}</h4>
            <div>
              <p>Assignee: {assignee}</p>
              <p>Origin: {origin}</p>
            </div>
            <div>
              <p>Destination: {destination}</p>
              <p>Status: {status}</p>
            </div>
          </li>
        );
      })}
    </ul>
  );
};

export default List;
