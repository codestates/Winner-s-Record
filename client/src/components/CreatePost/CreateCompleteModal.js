import { useHistory } from "react-router";

export default function CreateCompleteModal({ isModalOpen, docId }) {
  const history = useHistory();
  return (
    <>
      {isModalOpen ? (
        <div className="modal--backdrop">
          <div className="modal--view">
            <div className="modal--top">
              <img
                alt="signup"
                src="https://winnersrecordimagestorage.s3.ap-northeast-2.amazonaws.com/%EC%9E%90%EB%A3%8C/%E1%84%8E%E1%85%AE%E1%86%A8%E1%84%92%E1%85%A1.png"
              />
            </div>
            <div className="modal--content">게시글 생성이 완료되었습니다</div>
            <div className="modal--btncontainer">
              <button
                className="modal--btn-ok"
                onClick={() => history.replace(`post/${docId}`)}
              >
                확인
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
