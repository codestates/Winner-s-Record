import { useParams } from "react-router";
import axios from "axios";
import { useEffect, useState } from "react";

import Error from "./Error";
import Header from "../components/Header";
import Footer from "../components/Footer";
import ImageCarousel from "../components/Post/ImageCarousel";
import PostPrimaryButton from "../components/Post/PostPrimaryButton";
import LikeButton from "../components/Post/LikeButton";
import PostModal from "../components/Post/PostModal";
import NeedLoginModal from "../components/NeedLoginModal";
import PostMap from "../components/Post/PostMap";
import PostComments from "../components/Post/PostComments";
import PostUserInfo from "../components/Post/PostUserInfo";
import PostEditBtns from "../components/Post/PostEditBtns";
import { useSelector } from "react-redux";
import TournamentButton from "../components/Post/TournamentButton";
import LoadingIndicator from "../components/LoadingIndicator";

const Post = ({ match }) => {
  const [isLoading, setIsLoading] = useState(true);
  const { userInfo, isModalOpen } = useSelector((state) => ({
    userInfo: state.userInfo,
    isModalOpen: state.isModalOpen,
  }));
  const { postId } = useParams();
  const [postInfo, setPostInfo] = useState({
    userData: {
      userId: null,
      nickname: null,
      img: { link: null },
    },
  });

  const isMypost = postInfo.userData.userId === userInfo.userId;

  const [loginModal, setLoginModal] = useState(false);
  const [modalBtnType, setModalBtnType] = useState("close");

  const getPostData = () => {
    setIsLoading(true);
    const token = localStorage.getItem("token");

    const Authorization = `Bearer ${token}`;
    axios
      .get(`http://ec2-3-35-18-23.ap-northeast-2.compute.amazonaws.com/doc/${postId}`, {
        headers: { Authorization },
        withCredentials: true,
      })
      .then((res) => {
        setPostInfo(res.data.data);
        setTimeout(() => {
          setIsLoading(false);
        }, 500);
      })
      .catch((res) => {
        console.error(res);
      });
  };

  const countPrice = (price) => {
    if (price.length < 4) {
      return `${price}`;
    } else if (price.length < 5 && !Number(price.slice(1))) {
      return `${price.slice(0, 1)}천`;
    } else if (price.length < 5) {
      return `${price.slice(0, 1)}천 ${price.slice(1)}`;
    } else if (price.length >= 5 && !Number(price.slice(-4))) {
      return `${price.slice(0, -4)}만`;
    } else if (price.length >= 5) {
      return `${price.slice(0, -4)}만 ${price.slice(-4)}`;
    } else {
      return price;
    }
  };

  useEffect(() => {
    getPostData();
    setTimeout(() => {
      setIsLoading(false);
    }, 300);
    // eslint-disable-next-line
  }, [match.url]);

  let {
    userData,
    title,
    text,
    price,
    place,
    like,
    img,
    type,
    board = [],
    player = [],
    status,
  } = postInfo;

  return (
    <>
      {isLoading ? (
        <div className="post--container">
          <Header />
          <LoadingIndicator />
          <Footer />
        </div>
      ) : postInfo.title ? (
        <div className="post--container">
          <Header />
          <div className="post--inner">
            <ImageCarousel images={img} />
            <div className="post--header">
              <div className="title">{title}</div>
              {isMypost && status !== "완료" ? (
                <PostEditBtns
                  hostId={userData.userId}
                  setModalBtnType={setModalBtnType}
                  setLoginModal={setLoginModal}
                />
              ) : null}
            </div>
            <div className="post--userinfo--price">
              <PostUserInfo userData={userData} />
              {price ? (
                <div className="post--price">
                  <span>{`${countPrice(String(price))}원`}</span>
                </div>
              ) : null}
            </div>

            <div className="post--text">{text}</div>
            <PostMap place={place} />

            {status !== "대기" &&
            player.includes(userInfo.nickname) &&
            type === "tournament" ? (
              <PostComments
                board={board}
                postInfo={postInfo}
                setPostInfo={setPostInfo}
              />
            ) : null}

            <div className="post--btns">
              {isLoading ? null : postInfo.status === "tournament" ? (
                <TournamentButton
                  status={status}
                  setLoginModal={setLoginModal}
                  hostId={userData.userId}
                />
              ) : (
                <PostPrimaryButton
                  hostId={userData.userId}
                  type={type}
                  status={status}
                  setLoginModal={setLoginModal}
                  setModalBtnType={setModalBtnType}
                  player={player}
                />
              )}

              <LikeButton
                like={like}
                setLoginModal={setLoginModal}
                postInfo={postInfo}
                setPostInfo={setPostInfo}
                postId={postId}
              />
            </div>
            <NeedLoginModal
              isModalOpen={loginModal}
              setIsModalOpen={setLoginModal}
            />
            {isModalOpen ? (
              <PostModal
                modalBtnType={modalBtnType}
                status={status}
                setPostInfo={setPostInfo}
                player={player}
              />
            ) : null}
          </div>

          <Footer />
        </div>
      ) : (
        <Error />
      )}
    </>
  );
};

export default Post;
