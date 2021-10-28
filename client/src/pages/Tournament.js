import React, { useState } from "react";

import TopButton from "../components/TopButton";
import Search from "../components/Tournament/Search";

import PostList from "../components/Tournament/PostList";

const Tournament = () => {
  const [postList, setPostList] = useState([]);

  return (
    <div className="tournament--container">
      <Search setPostList={setPostList} />
      <PostList postList={postList} />
      <TopButton />
    </div>
  );
};

export default Tournament;
