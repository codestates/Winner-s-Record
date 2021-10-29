import axios from "axios";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const EntryPlayer = ({
  postId,
  userData,
  setApplied,
  fixed,
  setFixed,
  hostId,
  setIsModalActive,
  setModalText,
  setLoginModal,
  postType,
}) => {
  const { userInfo, isLogin } = useSelector((state) => ({
    userInfo: state.userInfo,
    isLogin: state.isLogin,
  }));
  const { userId, nickname, img, status, win, lose, point, rank } = userData;

  const fixPlayer = () => {
    const Authorization = `Bearer ${localStorage.getItem("token")}`;
    const endpoint = `http://localhost:8080/entry/${postId}`;
    if (fixed.length && postType === "match") {
      setModalText("다수의 상대를 지정할 수 없어요.");
      setIsModalActive(true);
    } else if (fixed.length > 7) {
      setModalText("대회 참가 인원은 7명까지 지정할 수 있어요.");
      setIsModalActive(true);
    } else {
      axios
        .put(endpoint, { userId }, { headers: { Authorization } })
        .then((res) => {
          console.log(res);
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
  };

  const deleteHandler = () => {
    const Authorization = `Bearer ${localStorage.getItem("token")}`;
    const endpoint = `http://localhost:8080/entry/${postId}`;

    if (!isLogin) {
      setLoginModal(true);
    } else if (hostId !== userInfo.userId && userId !== userInfo.userId) {
      setIsModalActive(true);
      setModalText("권한이 없습니다.");
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
    <li className="entry--player--container">
      <div className="entry--player--profile">
        <Link to={`/profile/${userId}`}>
          <div className="entry--player--inner">
            <div className="entry--player--img">
              <img src={img} alt={nickname} />
            </div>
            <div className="entry--player--text">
              <div className="name">{nickname}</div>
              <div className="record">{`${win}승 ${lose}패 승점 ${point}점 전체 ${rank}위`}</div>
            </div>
          </div>
        </Link>
      </div>
      <div className="entry-player--btns">
        {status === "대기" && userInfo.userId === hostId ? (
          <div onClick={fixPlayer}>확정</div>
        ) : null}
        <div onClick={deleteHandler}> 삭제 </div>
      </div>
    </li>
  );
};

export default EntryPlayer;
