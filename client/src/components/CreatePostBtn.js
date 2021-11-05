import React from "react";
import { Link } from "react-router-dom";

const CreatePostBtn = () => {
  return (
    <div className="fixedBtn create">
      <Link to="/doc">
        <i class="fas fa-plus"></i>
      </Link>
    </div>
  );
};

export default CreatePostBtn;
