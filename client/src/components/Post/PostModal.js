import { useHistory, useParams } from "react-router";
import axios from "axios";
import { useEffect, useState } from "react";

const PostModal = ({
  player,
  setIsModalActive,
  modalText,
  modalBtnType,
  setPostInfo,
  status,
}) => {
  const { postId } = useParams();
  return (
    <div className="modal--backdrop">
      <div className="modal--view">
        <div className="modal--text--container"></div>
        {modalBtnType === "result" ? (
          <div>
            <div className="winner">승자</div>
            <div className="loser">패자</div>
          </div>
        ) : (
          <div className="text">{modalText}</div>
        )}
        {modalBtnType === "close" ? (
          <div className="modal--btns--container">
            <div
              className="btn"
              onClick={() => {
                setIsModalActive(false);
              }}
            >
              닫기
            </div>
          </div>
        ) : modalBtnType === "status" ? (
          <ChangeStatusBtn
            setIsModalActive={setIsModalActive}
            status={status}
            setPostInfo={setPostInfo}
          />
        ) : modalBtnType === "choosewinner" ? (
          <ChooseWinner
            postId={postId}
            player={player}
            setIsModalActive={setIsModalActive}
          />
        ) : (
          <DeleteBtns setIsModalActive={setIsModalActive} />
        )}
      </div>
    </div>
  );
};

const Result = () => {};

const ChooseWinner = ({ postId, player, setIsModalActive }) => {
  const [isLoading, setIsLoading] = useState(true);
  const clickHandler = (winner, loser) => {
    const Authorization = `Bearer ${localStorage.getItem("token")}`;
    axios
      .post(
        `http://localhost:8080/match/${postId}`,
        { winner, loser },
        { headers: { Authorization } }
      )
      .then((res) => {
        setIsModalActive(false);
      });
  };

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
      console.log(player);
    }, 2000);
  }, []);

  return (
    <>
      <div className="modal--alert">되돌릴 수 없으니 주의하세요 !</div>
      {isLoading ? null : (
        <div className="modal--btns--container">
          <div
            className="player"
            onClick={() => {
              clickHandler(player[0], player[1]);
            }}
          >
            {player[0]}
          </div>
          <div
            className="player"
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

const DeleteBtns = ({ setIsModalActive }) => {
  const postId = useParams();
  const history = useHistory();

  const confirmDelete = () => {
    const Authorization = `Bearer ${localStorage.getItem("token")}`;
    axios
      .delete(`http://localhost:8080/doc/${postId}`, {
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
          setIsModalActive(false);
        }}
      >
        취소
      </div>
      <div className="btn" onClick={confirmDelete}>
        삭제
      </div>
    </div>
  );
};

const ChangeStatusBtn = ({ setIsModalActive, status, setPostInfo }) => {
  const { postId } = useParams();

  const changeStatus = () => {
    const Authorization = `Bearer ${localStorage.getItem("token")}`;
    if (status === "대기") {
      axios
        .put(
          `http://localhost:8080/doc/${postId}`,
          { status: "완료" },
          { headers: { Authorization } }
        )
        .then((res) => {
          setPostInfo(res.data.data);
          setIsModalActive(false);
        });
    } else {
      axios
        .put(
          `http://localhost:8080/doc/${postId}`,
          { status: "대기" },
          { headers: { Authorization } }
        )
        .then((res) => {
          setPostInfo(res.data.data);
          setIsModalActive(false);
        });
    }
  };

  return (
    <div className="modal--btns--container">
      <div
        className="btn"
        onClick={() => {
          setIsModalActive(false);
        }}
      >
        취소
      </div>
      <div className="btn" onClick={changeStatus}>
        변경
      </div>
    </div>
  );
};

export default PostModal;
