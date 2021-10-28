import { useHistory, useParams } from "react-router";
import axios from "axios";

const PostModal = ({ setIsModalActive, modalText, modalBtnType }) => {
  return (
    <div className="modal--backdrop">
      <div className="modal--view">
        <div className="modal--text--container"></div>
        <div className="text">{modalText}</div>
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
        ) : (
          <DeleteBtns setIsModalActive={setIsModalActive} />
        )}
      </div>
    </div>
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

export default PostModal;
