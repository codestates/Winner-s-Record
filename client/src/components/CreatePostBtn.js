import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const CreatePostBtn = ({ isTournament, setLoginModal }) => {
  const isLogin = useSelector((state) => state.isLogin);

  return (
    <div className="fixedBtn create">
      {isLogin ? (
        isTournament ? (
          <Link to="/create-tournament">
            <i className="fas fa-plus"></i>
          </Link>
        ) : (
          <Link to="/create-post">
            <i className="fas fa-plus"></i>
          </Link>
        )
      ) : (
        <div
          onClick={() => {
            setLoginModal(true);
          }}
        >
          <i className="fas fa-plus"></i>
        </div>
      )}
    </div>
  );
};

export default CreatePostBtn;
