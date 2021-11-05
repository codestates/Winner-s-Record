const TypeSelector = ({ searchOption, setSearchOption }) => {
  const { postType } = searchOption;

  return (
    <div className="search--type--container">
      <div
        className={`search--type--btn match ${
          postType === "match" ? " active" : ""
        }`}
        onClick={() => {
          if (postType === "match") {
            setSearchOption({ ...searchOption, postType: "all" });
          } else {
            setSearchOption({ ...searchOption, postType: "match" });
          }
        }}
      >
        <i class="fas fa-running"></i>
        <span>경기</span>
      </div>
      <div
        className={`search--type--btn trade ${
          postType === "trade" ? " active" : ""
        }`}
        onClick={() => {
          if (postType === "trade") {
            setSearchOption({ ...searchOption, postType: "all" });
          } else {
            setSearchOption({ ...searchOption, postType: "trade" });
          }
        }}
      >
        <i class="fas fa-shopping-basket"></i>

        <span>거래</span>
      </div>
    </div>
  );
};

export default TypeSelector;
