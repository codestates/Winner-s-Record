const TypeSelector = ({ searchOption, setSearchOption }) => {
  const { postType } = searchOption;

  return (
    <div className="search--type--container">
      <div
        className="search--type--match"
        onClick={() => {
          if (postType === "match") {
            setSearchOption({ ...searchOption, postType: "all" });
          } else {
            setSearchOption({ ...searchOption, postType: "match" });
          }
        }}
      >
        경기
      </div>
      <div
        className="search--type--trade"
        onClick={() => {
          if (postType === "trade") {
            setSearchOption({ ...searchOption, postType: "all" });
          } else {
            setSearchOption({ ...searchOption, postType: "trade" });
          }
        }}
      >
        거래
      </div>
    </div>
  );
};

export default TypeSelector;
