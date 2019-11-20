import React from "react";
import { useSelector } from "react-redux";

const List = props => {
  const articles = useSelector(state => state.articles);
  return (
    <ul>
      {articles.map(el => (
        <li key={el.id}>{el.title}</li>
      ))}
    </ul>
  );
};

export default List;
