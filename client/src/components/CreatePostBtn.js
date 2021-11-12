import React from "react";
import { Link } from "react-router-dom";

const CreatePostBtn = ({ isTournament }) => {
  return (
    <div className="fixedBtn create">
      {isTournament ? (
        <Link to="/create-tournament">
          <i className="fas fa-plus"></i>
        </Link>
      ) : (
        <Link to="/create-post">
          <i className="fas fa-plus"></i>
        </Link>
      )}
    </div>
  );
};

export default CreatePostBtn;
