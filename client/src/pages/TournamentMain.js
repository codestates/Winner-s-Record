import React, { useState } from "react";

import TopButton from "../components/TopButton";
import Search from "../components/TournamentMain/Search";

import PostList from "../components/TournamentMain/PostList";
import NoPost from "../components/TournamentMain/NoPost";
import NeedLoginModal from "../components/NeedLoginModal";

const TournamentMain = () => {
  const [loginModal, setLoginModal] = useState(false);
  const [postList, setPostList] = useState([]);

  const [searchOption, setSearchOption] = useState({
    game: "tournament",
    option: "title",
    input: "all",
    postType: "all",
  });

  return (
    <div className="tournament--container">
      <Search
        setPostList={setPostList}
        searchOption={searchOption}
        setSearchOption={setSearchOption}
      />
      Tournament Page
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
      <TopButton isMain />
      <NeedLoginModal isModalOpen={loginModal} setIsModalOpen={setLoginModal} />
    </div>
  );
};

export default TournamentMain;
