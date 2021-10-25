import axios from "axios";
import { useEffect, useState } from "react";

import TypeSelector from "./TypeSelector";
import GameSelector from "./GameSelector";
import OptionSelector from "./OptionSelector";
import SearchBar from "./SearchBar";

const Search = () => {
  const [game, setGame] = useState("all");
  const [option, setOption] = useState("title");
  const [input, setInput] = useState("all");
  const [postType, setPostType] = useState("all");

  useEffect(() => {
    console.log(postType);
  }, [postType]);

  const searchHandler = () => {
    if (!input) {
      setInput("all");
    }
    axios
      .get(
        `http://localhost:8080/post?type=${postType}&event=${game}&${option}=${input}`
      )
      .then((res) => {
        console.log(res);
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
