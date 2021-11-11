import { useEffect, useState } from "react";

const PostListContent = ({ postInfo }) => {
  const { id, event, userId, type, place, price, status, title, img, like } =
    postInfo;

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

  return (
    <div className="list--content--container">
      <div
        className={`list--content--done ${status === "대기" ? "" : "active"}`}
      >
        <div className="list--content--pic">
          <img src={img[0]} alt="사진" />
        </div>
        <div className="list--content--text">
          <div className="game">
            <span>{`#${gameNamer(event)}`}</span>
          </div>
          <div className="title">{title}</div>
          <div className="place">{placeToDisplay}</div>
          <div className="like">
            <i className="far fa-heart"></i>
            <span>{`${like}`}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostListContent;
