import axios from "axios";
import React, { useState } from "react";
import { useParams } from "react-router";

const Tournament = () => {
  const [matches, setMatches] = useState([]);
  const [editMatch, setEditMatch] = useState(0);
  const { postId } = useParams();

  const getData = () => {
    const Authorization = `Bearer ${localStorage.getItem("token")}`;

    axios.get(`http://localhost:8080/tournament/${postId}`).then((res) => {
      setMatches(res.data.data);
    });
  };

  return (
    <div className="tournament--container">
      <div className="title">토너먼트 페이지</div>
      <div className="round">1 라운드</div>
      <div className="player--container"></div>
      <div className="round">2 라운드</div>
      <div className="player--container"></div>
      <div className="round">Final 라운드</div>
      <div className="player--container"></div>
      {/* 에딧 모달 만들어야함 */}
    </div>
  );
};

export default Tournament;
