import React from "react";
import { Link } from "react-router-dom";

const CreatePostBtn = ({ isTournament }) => {
  return (
    <div className="fixedBtn create">
      {isTournament ? (
        <Link to="/토너먼트 생성">
          <i class="fas fa-plus"></i>
        </Link>
      ) : (
        <Link to="/doc">
          <i class="fas fa-plus"></i>
        </Link>
      )}
    </div>
  );
};

export default CreatePostBtn;
