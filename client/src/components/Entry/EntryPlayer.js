import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { setModalText } from "../../modules/modalText";
import { modalOn } from "../../modules/isModalOpen";

const EntryPlayer = ({
  postType,
  postId,
  userData,
  setApplied,
  fixed,
  setFixed,
  hostId,
  setLoginModal,
}) => {
  const { userInfo, isLogin } = useSelector((state) => ({
    userInfo: state.userInfo,
    isLogin: state.isLogin,
  }));
  const { userId, nickname, img, status, win, lose, point, rank } = userData;
  const dispatch = useDispatch();

  const fixPlayer = () => {
    const Authorization = `Bearer ${localStorage.getItem("token")}`;
    const endpoint = `http://3.36.30.63/entry/${postId}`;
    console.log(fixed.length, postType);
    if (fixed.length && postType === "match") {
      dispatch(setModalText("다수의 상대를 지정할 수 없어요."));
      dispatch(modalOn());
    } else if (fixed.length > 6) {
      dispatch(setModalText("대회 참가 인원은 7명까지 지정할 수 있어요."));
      dispatch(modalOn());
    } else {
      console.log("이거 들어갔지 ?");
      axios
        .put(endpoint, { userId }, { headers: { Authorization } })
        .then((res) => {
          console.log("이거 응답 데이터", res.data);
          const fixed = res.data.data.filter((e) => {
            return e.status === "확정" && e.userId !== hostId ? true : false;
          });
          const applied = res.data.data.filter((e) => {
            return e.status === "대기" && e.userId !== hostId ? true : false;
          });
          console.log(fixed);
          setFixed(fixed);
          setApplied(applied);
        });
    }
  };

  const deleteHandler = () => {
    const Authorization = `Bearer ${localStorage.getItem("token")}`;
    const endpoint = `http://3.36.30.63/entry/${postId}`;

    if (!isLogin) {
      setLoginModal(true);
    } else if (hostId !== userInfo.userId && userId !== userInfo.userId) {
      dispatch(modalOn());
      dispatch(setModalText("권한이 없습니다."));
    } else {
      if (userData.status === "확정") {
        axios
          .put(endpoint, { userId }, { headers: { Authorization } })
          .then((res) => {
            const fixed = res.data.data.filter((e) => {
              return e.status === "확정" && e.userId !== hostId ? true : false;
            });
            const applied = res.data.data.filter((e) => {
              return e.status === "대기" && e.userId !== hostId ? true : false;
            });
            setFixed(fixed);
            setApplied(applied);
          });
      } else {
        axios
          .delete(endpoint, { headers: { Authorization }, data: { userId } })
          .then((res) => {
            const fixed = res.data.data.filter((e) => {
              return e.status === "확정" && e.userId !== hostId ? true : false;
            });
            const applied = res.data.data.filter((e) => {
              return e.status === "대기" && e.userId !== hostId ? true : false;
            });
            setFixed(fixed);
            setApplied(applied);
          });
      }
    }
  };
  return (
    <li
      className={`entry--player--container ${
        status === "확정" ? "colored" : ""
      }`}
    >
      <div className="profile">
        <Link to={`/profile/${userId}`}>
          <div className="inner">
            <div className="img">
              <img src={img} alt={nickname} />
            </div>

            <div className="name">{nickname}</div>
            <div className="record">{`${win}승 ${lose}패 승점 ${point}점 전체 ${rank}위`}</div>
          </div>
        </Link>
      </div>
      <div className="btns">
        {status === "대기" && userInfo.userId === hostId ? (
          <div className="fix" onClick={fixPlayer}>
            <i className="fas fa-check-circle"></i>
          </div>
        ) : null}
        {userInfo.userId === hostId || userInfo.userId === userId ? (
          <div className="delete" onClick={deleteHandler}>
            <i className="fas fa-ban"></i>
          </div>
        ) : null}
      </div>
    </li>
  );
};

export default EntryPlayer;
