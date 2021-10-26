import { useState } from "react";
import { useHistory } from "react-router";

export default function Mypage() {
  const [userInfo, setUserInfo] = useState({
    nickname: "",
    image: "",
  });
  const history = useHistory();

  return (
    <div>
      <div className="mypage--profilecontainer">
        <div className="mypage--photo">사진</div>
        <span className="mypage--username">{userInfo.nickname}</span>
        <span
          className="mypage--edit"
          onClick={() => history.push("/mypage/edit")}
        >
          수정아이콘
        </span>
      </div>
      <div className="mypage--rankingcontainer">
        <div className="mypage--rankingtap">
          <ul>
            <li>테니스</li>
            <li>스쿼시</li>
            <li>배드민턴</li>
            <li>탁구</li>
          </ul>
        </div>
        <div className="mypage--ranking">위</div>
        <div className="mypage--score">승 패 점</div>
      </div>
      <div className="mypage--tap">
        <ul>
          <li>작성글</li>
          <li>관심글</li>
          <li>진행중</li>
        </ul>
      </div>
      <div className="mypage--postcontainer"></div>
    </div>
  );
}
