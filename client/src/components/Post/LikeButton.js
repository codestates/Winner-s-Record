import axios from "axios";
import { useSelector } from "react-redux";

const LikeButton = ({ like, setLoginModal, postInfo, setPostInfo, postId }) => {
  const { isLogin, userInfo } = useSelector((state) => ({
    isLogin: state.loginReducer,
    userInfo: state.userInfoReducer,
  }));

  const clickHandler = () => {
    if (!isLogin) {
      setLoginModal(true);
    } else {
      changeStatus();
    }
  };
  const changeStatus = () => {
    const authorization = `Bearer ${userInfo.token}`;
    if (like) {
      axios
        .post(
          "http://localhost:8080/like",
          { postId },
          { headers: { authorization } }
        )
        .then((res) => {
          if (res.status !== 201) {
            console.error("로그인 상태 확인 필요");
          } else {
            setPostInfo({ ...postInfo, like: true });
          }
        });
    } else {
      axios
        .post(
          "http://localhost:8080/like",
          { postId },
          { headers: { authorization } }
        )
        .then((res) => {
          if (res.status !== 204) {
            console.error("로그인 상태 확인 필요");
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
      <i class={`${like ? "fas" : "far"} fa-heart`}></i>
    </div>
  );
};

export default LikeButton;
