import axios from "axios";
import { useState, useEffect } from "react";

export default function Search() {
  const [nickname, setNickname] = useState("");
  const handleInputValue = (e) => {
    setNickname(e.target.value);
  };

  const handleSearch = () => {
    axios.get("");
  };
  return (
    <div>
      <input onChange={(e) => handleInputValue(e)}>search</input>
      <button onClick={handleInputValue()}></button>
    </div>
  );
}
