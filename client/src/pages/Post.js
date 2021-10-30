import { useParams } from "react-router";
import axios from "axios";
import { useEffect, useState } from "react";

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

const Post = () => {
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

  useEffect(() => {
    console.log("포스트 인포 확인하세요", postInfo);
  }, [postInfo]);

  const [loginModal, setLoginModal] = useState(false);
  const [modalBtnType, setModalBtnType] = useState("close");

  const getPostData = () => {
    const token = localStorage.getItem("token");

    const Authorization = `Bearer ${token}`;
    axios
      .get(`http://localhost:8080/doc/${postId}`, {
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

  useEffect(() => {
    getPostData();
    setTimeout(() => {
      setIsLoading(false);
    }, 300);
  }, []);

  let {
    userData,
    title,
    text,
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
      <ImageCarousel images={img} />
      <div className="post--header">
        <div className="post--title">{title}</div>
        <PostEditBtns
          hostId={userData.userId}
          setModalBtnType={setModalBtnType}
          setLoginModal={setLoginModal}
        />
      </div>

      <PostUserInfo userData={userData} />

      <div className="post--text">{text}</div>
      <PostMap place={place} />

      {status !== "대기" && player.includes(userInfo.nickname) ? (
        <PostComments board={board} setPostInfo={setPostInfo} />
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
      <NeedLoginModal isModalOpen={loginModal} setIsModalOpen={setLoginModal} />
      {isModalOpen ? (
        <PostModal
          modalBtnType={modalBtnType}
          status={status}
          setPostInfo={setPostInfo}
          player={player}
        />
      ) : null}
    </div>
  );
};

export default Post;
