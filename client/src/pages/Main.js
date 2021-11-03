import { useState } from "react";

import Search from "../components/Main/Search";
import PostList from "../components/Main/PostList";
import TopButton from "../components/TopButton";
import NoPost from "../components/Main/NoPost";
import NeedLoginModal from "../components/NeedLoginModal";
import CreatePostBtn from "../components/CreatePostBtn";

const Main = () => {
  const [loginModal, setLoginModal] = useState(false);
  const [postList, setPostList] = useState([]);

  const [searchOption, setSearchOption] = useState({
    game: "all",
    option: "title",
    input: "all",
    postType: "all",
  });

  return (
    <div className={"main--container"}>
      <Search
        setPostList={setPostList}
        searchOption={searchOption}
        setSearchOption={setSearchOption}
      />
      MainPage
      {postList.length ? (
        <PostList
          postList={postList}
          setPostList={setPostList}
          searchOption={searchOption}
          setSearchOption={setSearchOption}
        />
      ) : (
        <NoPost setLoginModal={setLoginModal} />
      )}
      <CreatePostBtn />
      <TopButton isMain />
      <NeedLoginModal isModalOpen={loginModal} setIsModalOpen={setLoginModal} />
    </div>
  );
};

export default Main;
