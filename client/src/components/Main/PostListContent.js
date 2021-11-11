import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const PostListContent = ({ postInfo }) => {
  const { id, event, type, place, price, status, title, img, like } = postInfo;
  const [placeToDisplay, setPlaceToDisplay] = useState("");

  useEffect(() => {
    const data = place.split("|");
    setPlaceToDisplay(data[4]);
  }, []);

  const gameNamer = (game) => {
    if (game === "tennis") {
      return "테니스";
    } else if (game === "pingpong") {
      return "탁구";
    } else if (game === "badminton") {
      return "배드민턴";
    } else if (game === "squash") {
      return "스쿼시";
    } else {
      return game + "오류발생";
    }
  };

  const countPrice = (price) => {
    if (price.length < 4) {
      return `${price}`;
    } else if (price.length < 5 && !Number(price.slice(1))) {
      return `${price.slice(0, 1)}천`;
    } else if (price.length < 5) {
      return `${price.slice(0, 1)}천 ${price.slice(1)}`;
    } else if (price.length >= 5 && !Number(price.slice(1))) {
      return `${price.slice(0, 1)}만`;
    } else if (price.length >= 5) {
      return `${price.slice(0, 1)}만 ${price.slice(1)}`;
    } else {
      return price;
    }
  };

  return (
    <div className="list--content--container">
      <Link to={`/post/${id}`}>
        <div
          className={`list--content--done ${status === "대기" ? "" : "active"}`}
        >
          <div className="list--content--pic">
            <img src={img[0]} alt="사진" />
            <div
              className={`list--content--type ${
                type === "match" ? "match" : "trade"
              } `}
            >
              <span>{type === "match" ? "경기" : "거래"}</span>
            </div>
          </div>
          <div className="list--content--text">
            <div className="game">
              <span>{`#${gameNamer(event)}`}</span>
            </div>
            <div className="title">{title}</div>
            <div className="place">{placeToDisplay}</div>
            {price ? (
              <div className="price">{countPrice(String(price))}원</div>
            ) : null}
            <div className="like">
              <i className="far fa-heart"></i>
              <span>{`${like}`}</span>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default PostListContent;
