import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router";
import { setModalText } from "../../modules/modalText";
import { modalOn } from "../../modules/isModalOpen";

const FixBtn = ({ fixed, postType, eventType }) => {
  const { postId } = useParams();
  const history = useHistory();
  const dispatch = useDispatch();

  const clickHandler = () => {
    if (fixed.length < 1) {
      dispatch(setModalText("상대를 지정해주세요."));
      dispatch(modalOn());
    } else if (fixed.length < 7 && postType === "tournament") {
      dispatch(setModalText("토너먼트는 7명의 참가자가 필요합니다."));
      dispatch(modalOn());
    } else {
      const Authorization = `Bearer ${localStorage.getItem("token")}`;
      axios
        .put(
          `http://ec2-3-35-18-23.ap-northeast-2.compute.amazonaws.com/doc/${postId}`,
          { status: "진행", type: postType, event: eventType },
          { headers: { Authorization } }
        )
        .then((res) => {
          dispatch(setModalText("상대가 지정되었습니다."));
          dispatch(modalOn());
          history.push(`/post/${postId}`);
        })
        .catch((err) => {
          console.error("에러 발생", err);
        });
    }
  };
  return (
    <div className={`primary--btn colored`} onClick={clickHandler}>
      확정 완료
    </div>
  );
};

const ApplyBtn = ({
  hostId,
  postId,
  applied,
  fixed,
  setApplied,
  setLoginModal,
}) => {
  const dispatch = useDispatch();
  const { isLogin, userInfo } = useSelector((state) => ({
    isLogin: state.isLogin,
    userInfo: state.userInfo,
  }));
  const clickHandler = () => {
    if (!isLogin) {
      setLoginModal(true);
    } else if (
      fixed.filter((userData) => {
        return userData.userId === userInfo.userId;
      }).length ||
      applied.filter((userData) => {
        return userData.userId === userInfo.userId;
      }).length
    ) {
      dispatch(setModalText("신청자 목록을 확인해주세요."));
      dispatch(modalOn());
    } else {
      const Authorization = `Bearer ${localStorage.getItem("token")}`;
      axios
        .post(
          `http://ec2-3-35-18-23.ap-northeast-2.compute.amazonaws.com/entry/${postId}`,
          {
            userId: userInfo.userId,
          },
          {
            headers: { Authorization },
          }
        )
        .then((res) => {
          const applied = res.data.data.filter((e) => {
            return e.status === "대기" && e.userId !== hostId ? true : false;
          });
          setApplied(applied);
        });
    }
  };

  return (
    <div className="primary--btn colored" onClick={clickHandler}>
      신청
    </div>
  );
};

export { FixBtn, ApplyBtn };
