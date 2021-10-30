import { useHistory } from "react-router";

export default function CreateCompleteModal({ isModalOpen, openModalHandler }) {
  const history = useHistory();
  return (
    <>
      {isModalOpen ? (
        <div className="modal--backdrop">
          <div className="modal--view">
            <div>게시글 생성이 완료되었습니다</div>
            <div className="modal--btnContainer">
              <button onClick={() => history.replace("/main")}>확인</button>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
