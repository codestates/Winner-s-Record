import { useHistory } from "react-router";
import { useDispatch } from "react-redux";
import { setPrevPage } from "../modules/prevPage";

export default function NeedLoginModal({ isModalOpen, setIsModalOpen }) {
  const history = useHistory();
  const dispatch = useDispatch();

  const handleClick = () => {
    const prevPage = window.location.href.split(
      "http://winner-s-record.click"
    )[1];
    dispatch(setPrevPage(prevPage));
    history.replace("/login");
  };

  return (
    <>
      {isModalOpen ? (
        <div className="modal--backdrop">
          <div className="modal--view">
            <div className="modal--top">
              <img
                alt="signup"
                src="https://winnersrecordimagestorage.s3.ap-northeast-2.amazonaws.com/%EC%9E%90%EB%A3%8C/%E1%84%80%E1%85%A7%E1%86%BC%E1%84%80%E1%85%A9.png"
              />
            </div>
            <div className="modal--content">로그인이 필요한 기능입니다</div>
            <div className="modal--btncontainer">
              <button
                className="modal--twobtn"
                onClick={() => {
                  setIsModalOpen(false);
                }}
              >
                취소
              </button>
              <button className="modal--twobtn-ok" onClick={handleClick}>
                로그인
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
