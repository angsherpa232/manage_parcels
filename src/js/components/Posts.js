import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getData } from "../actions/index";

const Post = props => {
  const articles = useSelector(state => state.remoteArticles.slice(0, 10));
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getData());
  });

  return (
    <ul>
      {articles.map(el => (
        <li key={el.id}>{el.title}</li>
      ))}
    </ul>
  );
};

export default Post;
