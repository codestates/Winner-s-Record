import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { modalOff } from "../../modules/isModalOpen";

const TournamentModal = () => {
  const dispatch = useDispatch();
  const modalText = useSelector((state) => state.modalText);

  return (
    <div className="modal--backdrop">
      <div className="modal--view tournament">
        <div className="modal--text--container">
          <div className="text">{modalText}</div>
        </div>
        <div className="modal--btns--container">
          <div
            className="btn"
            onClick={() => {
              dispatch(modalOff());
            }}
          >
            닫기
          </div>
        </div>
      </div>
    </div>
  );
};

export default TournamentModal;
