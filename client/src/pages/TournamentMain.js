import React, { useState } from "react";

import TopButton from "../components/TopButton";
import Search from "../components/TournamentMain/Search";

import PostList from "../components/TournamentMain/PostList";
import NoPost from "../components/TournamentMain/NoPost";
import NeedLoginModal from "../components/NeedLoginModal";

const TournamentMain = () => {
  const [loginModal, setLoginModal] = useState(false);
  const [postList, setPostList] = useState([]);

  return (
    <div className="tournament--container">
      <Search setPostList={setPostList} />
      Tournament Page
      {postList.length ? (
        <PostList postList={postList} />
      ) : (
        <NoPost setLoginModal={setLoginModal} />
      )}
      <TopButton />
      <NeedLoginModal isModalOpen={loginModal} setIsModalOpen={setLoginModal} />
    </div>
  );
};

export default TournamentMain;
