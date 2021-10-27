import { useState } from "react";

import Search from "../components/Main/Search";
import PostList from "../components/Main/PostList";
import TopButton from "../components/TopButton";

const Main = () => {
  const [postList, setPostList] = useState([]);

  return (
    <div className={"main--container"}>
      <Search setPostList={setPostList} />
      MainPage
      <PostList postList={postList} />
      <TopButton />
    </div>
  );
};

export default Main;
