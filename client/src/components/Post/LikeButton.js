import axios from "axios";
import { useSelector } from "react-redux";

const LikeButton = ({ like, setLoginModal, postInfo, setPostInfo, postId }) => {
  const { isLogin, userInfo } = useSelector((state) => ({
    isLogin: state.isLogin,
    userInfo: state.userInfo,
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
    console.log("온클릭 이벤트 시작");
    if (!like) {
      console.log("너 왜 안뜨니 ?");
      // 좋아요 추가
      axios
        .post(
          "http://localhost:8080/like",
          { docId: postId },
          { headers: { Authorization } }
        )
        .then((res) => {
          if (res.status !== 200) {
            console.log("에러발생", res);
          } else {
            setPostInfo({ ...postInfo, like: true });
          }
        });
    } else {
      // 좋아요 제거
      axios
        .delete("http://localhost:8080/like", {
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
      onClick={() => {
        clickHandler();
      }}
    >
      <i className={`${like ? "fas" : "far"} fa-heart`}></i>
    </div>
  );
};

export default LikeButton;
