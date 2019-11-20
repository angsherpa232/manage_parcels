import React from "react";
import List from "../src/js/components/List";
import Form from "../src/js/components/Form";
import Posts from "../src/js/components/Posts";

import "./App.css";

const App = () => (
  <div>
    <div>
      <h2>Articles</h2>
      <List />
    </div>
    <div>
      <h2>Add a new article</h2>
      <Form />
    </div>
    <div>
      <h2>API posts</h2>
      <Posts />
    </div>
  </div>
);

export default App;
