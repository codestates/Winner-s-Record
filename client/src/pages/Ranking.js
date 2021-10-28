import { useState, useEffect } from "react";
import axios from "axios";

export default function Ranking() {
  const [rank, SetRank] = useState({});
  const handleRank = (event) => {
    axios
      .get(`http://localhost:8080/rank?event=${event}&nickname=${nickname}`)
      .then((res) => {
        console.log(res.data);
        setRank();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return;
}
