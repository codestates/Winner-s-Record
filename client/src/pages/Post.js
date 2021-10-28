import { useParams } from "react-router";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import ImageCarousel from "../components/Post/ImageCarousel";
import PostPrimaryButton from "../components/Post/PostPrimaryButton";
import LikeButton from "../components/Post/LikeButton";
import PostModal from "../components/Post/PostModal";
import NeedLoginModal from "../components/NeedLoginModal";
import PostMap from "../components/Post/PostMap";
import PostComments from "../components/Post/PostComments";
import PostUserInfo from "../components/Post/PostUserInfo";
import PostEditBtns from "../components/Post/PostEditBtns";

const Post = () => {
  const { postId } = useParams();
  const [postInfo, setPostInfo] = useState({
    userData: {
      userId: null,
      nickname: null,
      img: { link: null },
    },
  });

  const [isModalActive, setIsModalActive] = useState(false);
  const [modalText, setModalText] = useState("");
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
        setPostInfo(res.data.data);
      })
      .catch((res) => {
        console.error(res);
      });
  };

  useEffect(() => {
    getPostData();
  }, []);

  let { userData, title, text, place, like, img, type, board = [] } = postInfo;

  return (
    <div className="post--container">
      <ImageCarousel images={img} />
      <div className="post--header">
        <div className="post--title">{title}</div>
        <PostEditBtns
          hostId={userData.userId}
          setModalText={setModalText}
          setIsModalActive={setIsModalActive}
          setModalBtnType={setModalBtnType}
          setLoginModal={setLoginModal}
        />
      </div>

      <PostUserInfo userData={userData} />
      <div className="post--text">{text}</div>
      <PostMap place={place} />

      <PostComments board={board} setPostInfo={setPostInfo} />

      <div className="post--btns">
        <PostPrimaryButton userId={userData.userId} type={type} />
        <LikeButton
          like={like}
          setLoginModal={setLoginModal}
          postInfo={postInfo}
          setPostInfo={setPostInfo}
          postId={postId}
        />
      </div>
      <NeedLoginModal isModalOpen={loginModal} setIsModalOpen={setLoginModal} />
      {isModalActive ? (
        <PostModal
          setIsModalActive={setIsModalActive}
          modalText={modalText}
          modalBtnType={modalBtnType}
        />
      ) : null}
    </div>
  );
};

export default Post;
