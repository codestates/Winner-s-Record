import axios from "axios";
import { useEffect, useState } from "react";

export default function ProfileRank({ nickname }) {
  const [rank, setRank] = useState({
    win: "",
    lose: "",
    point: "",
    rank: "",
  });

  const handleRank = (event) => {
    axios
      .get(`http://localhost:8080/rank?event=${event}&nickname=${nickname}`)
      .then((res) => {
        const filterd = res.data.data.filter((e) => e.nickname === nickname);
        setRank(...filterd);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    handleRank("tennis");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="profile--rankingcontainer">
      <div className="profile--rankingtap">
        <ul>
          <li onClick={() => handleRank("tennis")}>테니스</li>
          <li onClick={() => handleRank("squash")}>스쿼시</li>
          <li onClick={() => handleRank("badminton")}>배드민턴</li>
          <li onClick={() => handleRank("pingpong")}>탁구</li>
        </ul>
      </div>
      <div className="profile--ranking">{rank.rank}위</div>
      <div className="profile--score">
        {rank.win}승 {rank.lose}패 {rank.point}점
      </div>
    </div>
  );
}
