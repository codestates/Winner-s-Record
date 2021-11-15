import { useHistory, useParams } from "react-router";
import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { modalOff } from "../../modules/isModalOpen";

const PostModal = ({
  player,
  modalBtnType,
  setPostInfo,
  status,
  winner,
  loser,
}) => {
  const { postId } = useParams();
  const modalText = useSelector((state) => state.modalText);
  const dispatch = useDispatch();

  return (
    <div className="modal--backdrop">
      <div className="modal--view post">
        <div className="modal--text--container">
          {modalBtnType === "result" ? (
            <div className="modal--btns--container">
              <div className="winner">{`승자 ${winner}`}</div>
              <div className="loser">{`패자 ${loser}`}</div>
            </div>
          ) : (
            <div className="text">{modalText}</div>
          )}
        </div>
        {modalBtnType === "close" || modalBtnType === "result" ? (
          <div className="modal--btns--container">
            <div
              className="btn colored"
              onClick={() => {
                dispatch(modalOff());
              }}
            >
              닫기
            </div>
          </div>
        ) : modalBtnType === "status" ? (
          <ChangeStatusBtn status={status} setPostInfo={setPostInfo} />
        ) : modalBtnType === "choosewinner" ? (
          <ChooseWinner postId={postId} player={player} />
        ) : (
          <DeleteBtns />
        )}
      </div>
    </div>
  );
};

const ChooseWinner = ({ postId, player }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [timer, setTimer] = useState(3);
  const history = useHistory();
  const dispatch = useDispatch();
  const clickHandler = (winner, loser) => {
    const Authorization = `Bearer ${localStorage.getItem("token")}`;
    axios
      .post(
        `http://ec2-3-35-18-23.ap-northeast-2.compute.amazonaws.com/match/${postId}`,
        { winner, loser },
        { headers: { Authorization } }
      )
      .then((res) => {
        dispatch(modalOff());
        history.push("/main");
      });
  };

  useEffect(() => {
    setTimeout(() => {
      setTimer(2);
    }, 1000);
    setTimeout(() => {
      setTimer(1);
    }, 2000);
    setTimeout(() => {
      setIsLoading(false);
    }, 3000);
  }, []);

  return (
    <>
      <div className="modal--alert">되돌릴 수 없으니 주의하세요 !</div>
      {isLoading ? (
        <div className="modal--timer">{timer}</div>
      ) : (
        <div className="modal--btns--container player">
          <div
            className="btn colored"
            onClick={() => {
              clickHandler(player[0], player[1]);
            }}
          >
            {player[0]}
          </div>
          <div
            className="btn colored"
            onClick={() => {
              clickHandler(player[1], player[0]);
            }}
          >
            {player[1]}
          </div>
        </div>
      )}
    </>
  );
};

const DeleteBtns = () => {
  const postId = useParams();
  const history = useHistory();
  const dispatch = useDispatch();

  const confirmDelete = () => {
    const Authorization = `Bearer ${localStorage.getItem("token")}`;
    axios
      .delete(`http://ec2-3-35-18-23.ap-northeast-2.compute.amazonaws.com/doc/${postId}`, {
        headers: { Authorization },
      })
      .then((res) => {
        history.push("/main");
      });
  };
  return (
    <div className="modal--btns--container">
      <div
        className="btn"
        onClick={() => {
          dispatch(modalOff());
        }}
      >
        취소
      </div>
      <div className="btn colored" onClick={confirmDelete}>
        삭제
      </div>
    </div>
  );
};

const ChangeStatusBtn = ({ status, setPostInfo }) => {
  const { postId } = useParams();
  const dispatch = useDispatch();
  const changeStatus = () => {
    const Authorization = `Bearer ${localStorage.getItem("token")}`;
    if (status === "대기") {
      axios
        .put(
          `http://ec2-3-35-18-23.ap-northeast-2.compute.amazonaws.com/doc/${postId}`,
          { status: "완료" },
          { headers: { Authorization } }
        )
        .then((res) => {
          setPostInfo(res.data.data);
          dispatch(modalOff());
        });
    } else {
      axios
        .put(
          `http://ec2-3-35-18-23.ap-northeast-2.compute.amazonaws.com/doc/${postId}`,
          { status: "대기" },
          { headers: { Authorization } }
        )
        .then((res) => {
          setPostInfo(res.data.data);
          dispatch(modalOff());
        });
    }
  };

  return (
    <div className="modal--btns--container">
      <div
        className="btn"
        onClick={() => {
          dispatch(modalOff());
        }}
      >
        취소
      </div>
      <div className="btn colored" onClick={changeStatus}>
        변경
      </div>
    </div>
  );
};

export default PostModal;
