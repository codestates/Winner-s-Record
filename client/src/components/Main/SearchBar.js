const SearchBar = ({ searchHandler, searchOption, setSearchOption }) => {
  const inputHandler = (e) => {
    if (e.key === "Enter") {
      searchHandler();
    }
    if (e.target.value === "") {
      setSearchOption({ ...searchOption, input: "all" });
    } else {
      setSearchOption({ ...searchOption, input: e.target.value });
    }
  };

  return (
    <div className="search--bar--container">
      <input
        type="text"
        onKeyUp={inputHandler}
        className="search--input"
        placeholder={`검색어를 입력해주세요.`}
      />
      <div onClick={searchHandler} className="search--input--btn">
        <i className="fas fa-search" />
      </div>
    </div>
  );
};

export default SearchBar;
