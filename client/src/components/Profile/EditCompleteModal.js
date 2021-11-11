import { useHistory } from "react-router";

export default function EditCompleteModal({
  isModalOpen,
  openModalHandler,
  editHandler,
}) {
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
            <div className="modal--content">회원정보 수정이 완료되었습니다</div>
            <div className="modal--btncontainer">
              <button className="modal--twobtn-ok" onClick={openModalHandler}>
                확인
              </button>
              <button className="modal--twobtn-ok" onClick={editHandler}>
                마이페이지
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
