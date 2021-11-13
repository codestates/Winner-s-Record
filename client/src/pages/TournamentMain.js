import React, { useState } from "react";

import TopButton from "../components/TopButton";
import Search from "../components/TournamentMain/Search";

import PostList from "../components/TournamentMain/PostList";
import NoPost from "../components/TournamentMain/NoPost";
import NeedLoginModal from "../components/NeedLoginModal";
import Header from "../components/Header";
import Footer from "../components/Footer";
import CreatePostBtn from "../components/CreatePostBtn";
import LoadingIndicator from "../components/LoadingIndicator";

const TournamentMain = () => {
  const [loginModal, setLoginModal] = useState(false);
  const [postList, setPostList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const [searchOption, setSearchOption] = useState({
    game: "all",
    option: "title",
    input: "all",
  });

  return (
    <div className="main--container">
      <Header />
      <Search
        setPostList={setPostList}
        searchOption={searchOption}
        setSearchOption={setSearchOption}
        setIsLoading={setIsLoading}
      />
      {isLoading ? (
        <LoadingIndicator />
      ) : postList.length ? (
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
      <CreatePostBtn isTournament />
      <NeedLoginModal isModalOpen={loginModal} setIsModalOpen={setLoginModal} />
      <Footer />
    </div>
  );
};

export default TournamentMain;
