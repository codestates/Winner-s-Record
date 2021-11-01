import axios from "axios";
import { useEffect, useState } from "react";

import TypeSelector from "./TypeSelector";
import GameSelector from "./GameSelector";
import OptionSelector from "./OptionSelector";
import SearchBar from "./SearchBar";

const Search = ({ setPostList, searchOption, setSearchOption }) => {
  useEffect(() => {
    searchHandler();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const searchHandler = () => {
    if (!searchOption.input) {
      setSearchOption({ ...searchOption, input: "all" });
    }
    const { postType, game, option, input } = searchOption;

    axios
      .get(
        `http://localhost:8080/doc?type=${postType}&event=${game}&${option}=${input}&page=0`
      )
      .then((res) => {
        if (res.status === 404) {
        } else {
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
        }
      })
      .catch((res) => {
        setPostList([]);
      });
  };

  return (
    <div>
      <TypeSelector
        setSearchOption={setSearchOption}
        searchOption={searchOption}
      />
      <GameSelector
        setSearchOption={setSearchOption}
        searchOption={searchOption}
      />
      <OptionSelector
        setSearchOption={setSearchOption}
        searchOption={searchOption}
      />
      <SearchBar
        searchHandler={searchHandler}
        setSearchOption={setSearchOption}
        searchOption={searchOption}
      />
    </div>
  );
};

export default Search;
