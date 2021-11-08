import axios from "axios";
import { useState } from "react";

export default function Search({ setList, event }) {
  const [nickname, setNickname] = useState("all");
  const handleInputValue = (e) => {
    setNickname(e.target.value);
  };

  const handleList = () => {
    axios
      .get(`http://3.36.30.63/rank?event=${event}&nickname=${nickname}`)
      .then((res) => {
        setList(res.data.data);
      })
      .catch((err) => {
        console.log(err);
        setList([]);
      });
  };

  return (
    <div>
      <input
        onChange={(e) => handleInputValue(e)}
        placeholder="랭킹을 검색하실 닉네임을 입력해주세요"
      />
      <button onClick={handleList}>검색</button>
    </div>
  );
}
