import axios from "axios";
import { useEffect, useState } from "react";

import GameSelector from "./GameSelector";
import OptionSelector from "./OptionSelector";
import SearchBar from "./SearchBar";

const Search = ({ setPostList, searchOption, setSearchOption }) => {
  useEffect(() => {
    searchHandler();
  }, []);

  const searchHandler = () => {
    if (!searchOption.input) {
      setSearchOption({ ...searchOption, input: "all" });
    }

    const { game, option, input } = searchOption;

    axios
      .get(
        `https://server.winner-s-record.link/doc?type=tournament&event=${game}&${option}=${input}&page=0`
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
    <div className="search--container">
      <div className="wrapper">
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
    </div>
  );
};

export default Search;
