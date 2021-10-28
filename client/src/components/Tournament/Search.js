import axios from "axios";
import { useEffect, useState } from "react";

import TypeSelector from "./TypeSelector";
import GameSelector from "./GameSelector";
import OptionSelector from "./OptionSelector";
import SearchBar from "./SearchBar";

const Search = ({ setPostList }) => {
  const [game, setGame] = useState("all");
  const [option, setOption] = useState("title");
  const [input, setInput] = useState("all");
  const [postType, setPostType] = useState("");

  useEffect(() => {
    searchHandler();
  }, []);

  const searchHandler = () => {
    if (!input) {
      setInput("all");
    }
    axios
      .get(
        `http://localhost:8080/post?type=tournament&event=${game}&${option}=${input}`
      )
      .then((res) => {
        const sorted = res.data.data.sort((a, b) => {
          if (a.status === "대기" && b.status !== "대기") {
            return -1;
          } else if (a.status !== "대기" && b.status === "대기") {
            return 1;
          } else {
            return 0;
          }
        });
        setPostList(sorted);
      });
  };

  return (
    <div>
      <TypeSelector postType={postType} setPostType={setPostType} />
      <GameSelector setGame={setGame} />
      <OptionSelector setOption={setOption} />
      <SearchBar searchHandler={searchHandler} setInput={setInput} />
    </div>
  );
};

export default Search;
