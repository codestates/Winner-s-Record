const TypeSelector = ({ postType, setPostType }) => {
  return (
    <div className="search--type--container">
      <div
        className="search--type--match"
        onClick={() => {
          if (postType === "match") {
            setPostType("all");
          } else {
            setPostType("match");
          }
        }}
      >
        경기
      </div>
      <div
        className="search--type--trade"
        onClick={() => {
          if (postType === "trade") {
            setPostType("all");
          } else {
            setPostType("trade");
          }
        }}
      >
        거래
      </div>
    </div>
  );
};

export default TypeSelector;
