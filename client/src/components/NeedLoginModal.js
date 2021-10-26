import { useHistory } from "react-router";

export default function NeedLoginModal({ isModalOpen, setIsModalOpen }) {
  const history = useHistory();
  return (
    <>
      {isModalOpen ? (
        <div className="modal--backdrop">
          <div className="modal--view">
            <div>로그인이 필요한 기능입니다</div>
            <div className="modal--btnContainer">
              <button
                onClick={() => {
                  setIsModalOpen(false);
                }}
              >
                취소
              </button>
              <button onClick={() => history.push("/login")}>로그인</button>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
