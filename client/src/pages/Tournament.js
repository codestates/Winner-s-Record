import React, { useState } from "react";
import Search from "../components/Tournament/Search";

import TopButton from "../components/TopButton";

const Tournament = () => {
  const [postList, setPostList] = useState([]);

  return (
    <div className="tournament--container">
      <Search />
      <div>포스트 리스트</div>
      <TopButton />
    </div>
  );
};

export default Tournament;
