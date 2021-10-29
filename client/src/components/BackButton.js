import React from "react";
import { useHistory } from "react-router-dom";

const BackButton = () => {
  const history = useHistory();

  return (
    <div
      className="fixedBtn back"
      onClick={() => {
        history.go(-1);
      }}
    >
      뒤로 가기
    </div>
  );
};

export default BackButton;
