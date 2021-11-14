import axios from "axios";

const TypeSelector = ({ searchOption, setSearchOption, setPostList }) => {
  const { postType } = searchOption;
  const getData = (type) => {
    const { game, option, input } = searchOption;

    axios
      .get(
        `http://ec2-13-124-226-101.ap-northeast-2.compute.amazonaws.com/doc?type=${type}&event=${game}&${option}=${input}&page=0`
      )
      .then((res) => {
        setPostList(res.data.data);
      })
      .catch((err) => {
        console.error("에러 발생", err);
        setPostList([]);
      });
  };
  return (
    <div className="search--type--container">
      <div
        className={`search--type--btn match ${
          postType === "match" ? " active" : ""
        }`}
        onClick={() => {
          if (postType === "match") {
            setSearchOption({ ...searchOption, postType: "all" });
            getData("all");
          } else {
            setSearchOption({ ...searchOption, postType: "match" });
            getData("match");
          }
        }}
      >
        <i className="fas fa-running"></i>
        <span>경기</span>
      </div>
      <div
        className={`search--type--btn trade ${
          postType === "trade" ? " active" : ""
        }`}
        onClick={() => {
          if (postType === "trade") {
            setSearchOption({ ...searchOption, postType: "all" });
            getData("all");
          } else {
            setSearchOption({ ...searchOption, postType: "trade" });
            getData("trade");
          }
        }}
      >
        <i className="fas fa-shopping-basket"></i>

        <span>거래</span>
      </div>
    </div>
  );
};

export default TypeSelector;
