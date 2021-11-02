import { useHistory } from "react-router";

export default function SignupCompleteModal({ isModalOpen, openModalHandler }) {
  const history = useHistory();
  return (
    <>
      {isModalOpen ? (
        <div className="modal--backdrop">
          <div className="modal--view">
            <div className="modal--top"></div>
            <div className="modal--content">회원가입을 ㅊㅋ</div>
            <div className="modal--btncontainer">
              <button
                className="modal--btn-ok"
                onClick={() => history.replace("/login")}
              >
                로그인
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
