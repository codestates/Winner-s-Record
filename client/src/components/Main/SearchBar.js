const SearchBar = ({ searchHandler, setInput }) => {
  const inputHandler = (e) => {
    if (e.key === "Enter") {
      searchHandler();
    }
    if (e.target.value === "") {
      setInput("all");
    } else {
      setInput(e.target.value);
    }
  };

  return (
    <div className="search--bar--container">
      <input type="text" onKeyUp={inputHandler} className="search--input" />
      <button onClick={searchHandler} className="search--input--btn">
        검색
      </button>
    </div>
  );
};

export default SearchBar;
