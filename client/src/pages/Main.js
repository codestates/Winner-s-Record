import { useEffect, useState } from "react";

import Search from "../components/Main/Search";
import PostList from "../components/Main/PostList";

const Main = () => {
  const [postList, setPostList] = useState([]);

  useEffect(() => {
    console.log(postList);
  }, [postList]);

  return (
    <div>
      <Search setPostList={setPostList} />
      MainPage
      <PostList postList={postList} />
    </div>
  );
};

export default Main;
