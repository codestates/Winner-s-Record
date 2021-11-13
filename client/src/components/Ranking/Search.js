import axios from "axios";
import { useState } from "react";

export default function Search({ setList, event, setIsLoading }) {
  const [nickname, setNickname] = useState("all");
  const handleInputValue = (e) => {
    setNickname(e.target.value);
  };

  const handleList = () => {
    setIsLoading(true);
    axios
      .get(
        `https://server.winner-s-record.link/rank?event=${event}&nickname=${nickname}`
      )
      .then((res) => {
        setList(res.data.data);
        setTimeout(() => {
          setIsLoading(false);
        }, 500);
      })
      .catch((err) => {
        setTimeout(() => {
          setIsLoading(false);
        }, 500);
        setList([]);
      });
  };

  const handleKeyPress = (e) => {
    if (e.type === "keypress" && e.code === "Enter") {
      handleList();
    }
  };

  return (
    <div className="ranking--searchwrapper">
      <input
        className="ranking--search"
        onKeyPress={handleKeyPress}
        onChange={(e) => handleInputValue(e)}
        placeholder="랭킹을 검색하실 닉네임을 입력해주세요"
      />
      <span className="ranking--searchbtn" onClick={handleList}>
        <i className="fas fa-search" />
      </span>
    </div>
  );
}
