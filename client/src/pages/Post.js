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

  const [edit, setEdit] = useState(false);
  const isMypost = postInfo.userData.userId === userInfo.userId;

  useEffect(() => {
    console.log("포스트 인포 확인하세요", postInfo);
  }, [postInfo]);

  const [loginModal, setLoginModal] = useState(false);
  const [modalBtnType, setModalBtnType] = useState("close");

  const getPostData = () => {
    const token = localStorage.getItem("token");

    const Authorization = `Bearer ${token}`;
    axios
      .get(`http://server.winner-s-record.link/doc/${postId}`, {
        headers: { Authorization },
        withCredentials: true,
      })
      .then((res) => {
        console.log(res);
        setPostInfo(res.data.data);
      })
      .catch((res) => {
        console.error(res);
      });
  };

  const countPrice = (price) => {
    console.log(typeof price);
    if (price.length < 4) {
      return `${price}`;
    } else if (price.length < 5 && !Number(price.slice(1))) {
      return `${price.slice(0, 1)}천`;
    } else if (price.length < 5) {
      return `${price.slice(0, 1)}천 ${price.slice(1)}`;
    } else if (price.length >= 5 && !Number(price.slice(1))) {
      return `${price.slice(0, 1)}만`;
    } else if (price.length >= 5) {
      return `${price.slice(0, 1)}만 ${price.slice(1)}`;
    } else {
      return price;
    }
  };

  useEffect(() => {
    getPostData();
    setTimeout(() => {
      setIsLoading(false);
    }, 300);
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
    <div className="post--container">
      <Header />
      {postInfo.title ? (
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
      ) : (
        <Error />
      )}

      <Footer />
    </div>
  );
};

export default Post;
