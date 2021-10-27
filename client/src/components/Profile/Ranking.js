import axios from "axios";
import { useEffect, useState } from "react";

export default function Ranking({ nickname }) {
  const [score, setScore] = useState({
    win: 1,
    lose: 2,
    point: 5,
  });

  const handleScore = (event) => {
    axios
      .get(`http://localhost:8080/rank?event=${event}nickname=${nickname}`)
      .then((res) => {
        setScore(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    handleScore("tennis");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="profile--rankingcontainer">
      <div className="profile--rankingtap">
        <ul>
          <li onClick={() => handleScore("tennis")}>테니스</li>
          <li onClick={() => handleScore("squash")}>스쿼시</li>
          <li onClick={() => handleScore("badminton")}>배드민턴</li>
          <li onClick={() => handleScore("pingpong")}>탁구</li>
        </ul>
      </div>
      <div className="profile--ranking">위</div>
      <div className="profile--score">
        {score.win}승 {score.lose}패 {score.point}점
      </div>
    </div>
  );
}
