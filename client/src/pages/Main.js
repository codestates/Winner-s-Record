import { useEffect, useState } from "react";

import Search from "../components/Main/Search";
import PostList from "../components/Main/PostList";
import TopButton from "../components/TopButton";
import NoPost from "../components/Main/NoPost";
import NeedLoginModal from "../components/NeedLoginModal";
import CreatePostBtn from "../components/CreatePostBtn";
import Header from "../components/Header";
import Footer from "../components/Footer";
import LoadingIndicator from "../components/LoadingIndicator";

const Main = () => {
  const [loginModal, setLoginModal] = useState(false);
  const [postList, setPostList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const [searchOption, setSearchOption] = useState({
    game: "all",
    option: "title",
    input: "all",
    postType: "all",
  });

  useEffect(() => {
    window.scrollTo({
      top: 0,
    });
  }, []);

  return (
    <div className={"main--container"}>
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
      <CreatePostBtn setLoginModal={setLoginModal} />
      <TopButton isMain />
      <NeedLoginModal isModalOpen={loginModal} setIsModalOpen={setLoginModal} />
      <Footer />
    </div>
  );
};

export default Main;
