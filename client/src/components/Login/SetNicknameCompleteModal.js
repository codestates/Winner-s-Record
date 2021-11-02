import { useHistory } from "react-router";

export default function SetNicknameCompleteModal({
  isModalOpen,
  openModalHandler,
}) {
  const history = useHistory();
  return (
    <>
      {isModalOpen ? (
        <div className="modal--backdrop">
          <div className="modal--view">
            <div>닉네임 설정이 완료되었습니다</div>
            <div className="modal--btncontainer">
              <button onClick={() => history.replace("/main")}>시작하기</button>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
