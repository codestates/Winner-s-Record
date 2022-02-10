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
      <i className="fas fa-chevron-left"></i>
    </div>
  );
};

export default BackButton;
