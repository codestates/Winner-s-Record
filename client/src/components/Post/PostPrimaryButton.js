import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const TradeButton = ({ userId }) => {
  const userLoggedIn = useSelector((state) => state.userInfoReducer);

  const changeStatus = () => {
    // 아시오스 요청 보내기
  };
  return (
    <>
      {userId === userLoggedIn.userId ? (
        <div className="post-primarybtn">판매 상태 변경</div>
      ) : (
        <div className="post-primarybtn">채팅 보내기</div>
      )}
    </>
  );
};

const MatchButton = ({ userId }) => {
  const [display, setDisplay] = useState("");

  return <div>경기 버튼이에옹</div>;
};

const PostPrimaryButton = ({ userId, type }) => {
  const [display, setDisplay] = useState("");
  console.log(type);
  return (
    <>
      {type === "trade" ? (
        <TradeButton userId={userId} />
      ) : (
        <MatchButton userId={userId} />
      )}
    </>
  );
};

export default PostPrimaryButton;
