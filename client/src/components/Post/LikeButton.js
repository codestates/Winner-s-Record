import axios from "axios";
import { useSelector } from "react-redux";

const LikeButton = ({ like, setLoginModal, postInfo, setPostInfo, postId }) => {
  const { isLogin } = useSelector((state) => ({
    isLogin: state.isLogin,
  }));

  const clickHandler = () => {
    if (!isLogin) {
      setLoginModal(true);
    } else {
      changeStatus();
    }
  };
  const changeStatus = () => {
    const Authorization = `Bearer ${localStorage.getItem("token")}`;
    if (!like) {
      // 좋아요 추가
      axios
        .post(
          "http://ec2-3-35-18-23.ap-northeast-2.compute.amazonaws.com/like",
          { docId: postId },
          { headers: { Authorization } }
        )
        .then((res) => {
          if (res.status !== 201) {
            console.log("에러발생", res);
          } else {
            setPostInfo({ ...postInfo, like: true });
          }
        });
    } else {
      // 좋아요 제거
      axios
        .delete("http://ec2-3-35-18-23.ap-northeast-2.compute.amazonaws.com/like", {
          headers: { Authorization },
          data: { docId: postId },
        })
        .then((res) => {
          if (res.status !== 204) {
            console.log("에러발생", res);
          } else {
            setPostInfo({ ...postInfo, like: false });
          }
        });
    }
  };
  return (
    <div
      className="like"
      onClick={() => {
        clickHandler();
      }}
    >
      <i className={`${like ? "fas" : "far"} fa-heart`}></i>
    </div>
  );
};

export default LikeButton;
