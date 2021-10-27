import { useHistory } from "react-router";
import { useDispatch } from "react-redux";
import { setPrevPage } from "../modules/prevPage";

export default function NeedLoginModal({ isModalOpen, setIsModalOpen }) {
  const history = useHistory();
  const dispatch = useDispatch();
  const handleClick = () => {
    const prevPage = window.location.href.split("http://localhost:3000")[1];
    dispatch(setPrevPage(prevPage));
    history.push("/login");
  };
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
              <button onClick={handleClick}>로그인</button>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
