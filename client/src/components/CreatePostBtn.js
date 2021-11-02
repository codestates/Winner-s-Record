import React from "react";
import { Link } from "react-router-dom";

const CreatePostBtn = () => {
  return (
    <div className="fixedBtn create">
      <Link to="/doc">
        <div>생성</div>
      </Link>
    </div>
  );
};

export default CreatePostBtn;
