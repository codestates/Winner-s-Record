import { useHistory } from "react-router";

export default function EditCompleteModal({ isModalOpen, openModalHandler }) {
  const history = useHistory();
  return (
    <>
      {isModalOpen ? (
        <div className="modal--backdrop">
          <div className="modal--view">
            <div>회원정보 수정이 완료되었습니다</div>
            <div className="modal--btnContainer">
              <button onClick={() => history.replace("/mypage")}>확인</button>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
