import React from "react";
import { useSelector } from "react-redux";
import List from "../components/List";

const Bikers = props => {
  const articles = useSelector(state => state.articles);

  const specificBiker = articles.filter(biker => {
    const { assignee } = biker;
    return assignee === "kushal";
  });

  return <List bikers={specificBiker} />;
};

export default Bikers;
