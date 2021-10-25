import ImageCarousel from "../components/Post/ImageCarousel";
import { useParams } from "react-router";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Post = () => {
  const { postId } = useParams();
  const [postInfo, setPostInfo] = useState({});
  const getPostData = () => {
    axios.get(`http://localhost:8080/post/${postId}`).then((res) => {
      setPostInfo(res.data.data);
      console.log(res.data.data.userData);
    });
  };
  useEffect(() => {
    getPostData();
  }, []);

  let { userData, title, text, place, like, img } = postInfo;
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
        <div>만능 버튼</div>
        <div>{`좋아요 ${like}`}</div>
      </div>
    </div>
  );
};

export default Post;
