import { useParams } from "react-router";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import ImageCarousel from "../components/Post/ImageCarousel";
import PostPrimaryButton from "../components/Post/PostPrimaryButton";
import LikeButton from "../components/Post/LikeButton";
import PostModal from "../components/Post/PostModal";
import NeedLoginModal from "../components/NeedLoginModal";
import { useSelector } from "react-redux";

const Post = () => {
  const { postId } = useParams();
  const userInfo = useSelector((state) => state.userInfoReducer);
  const [postInfo, setPostInfo] = useState({
    userData: {
      userId: null,
      nickname: null,
      img: { link: null },
    },
  });

  const [isModalActive, setIsModalActive] = useState(false);
  const [loginModal, setLoginModal] = useState(false);

  const getPostData = () => {
    const Authorization = `Bearer ${userInfo.token}`;
    axios
      .get(`http://localhost:8080/post/${postId}`, {
        headers: { Authorization },
        withCredentials: true,
      })
      .then((res) => {
        setPostInfo(res.data.data);
        console.log(res);
      });
  };

  useEffect(() => {
    getPostData();
  }, []);

  useEffect(() => {
    console.log(loginModal);
  }, [loginModal]);

  let { userData, title, text, place, like, img, type } = postInfo;

  return (
    <div className="post--container">
      <ImageCarousel images={img} />
      <div className="post--header">
        <div className="post--title">{title}</div>
        <div className="post--editbtns--container">
          <div>수정</div>
          <div>삭제</div>
        </div>
      </div>
      <div className="post--userinfo--container">
        <Link to={`/mypage/${userData.userId}`}>
          <div className="post--userinfo--inner">
            <div className="post--userinfo--img">
              <img src={userData.img.link} alt={userData.nickname} />
            </div>
            <div className="post--userinfo--name">{userData.nickname}</div>
          </div>
        </Link>
      </div>

      <div className="post--text">{text}</div>
      <div className="post--map">{`맵 자리 ${place}`}</div>
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
      {isModalActive ? <PostModal setIsModalActive={setIsModalActive} /> : null}
    </div>
  );
};

export default Post;
