import axios from "axios";
import { useState, useEffect } from "react";
import { useHistory } from "react-router";
import PostList from "../components/Main/PostList";

export default function Mypage() {
  const [isLoading, setIsLoading] = useState(true);
  const [userInfo, setUserInfo] = useState({
    userId: "",
    nickname: "",
    image: "",
  });

  const [list, setList] = useState([]);
  const history = useHistory();

  const handleCreatedList = () => {
    axios.get("endpoint/post?hostId=userId");
  };

  const handleLikeList = () => {
    axios.get();
  };

  const handleProgressList = () => {};

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
    } else {
    }
  }, []);

  return (
    <>
      {isLoading ? null : (
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
              <li onClick={handleCreatedList}>작성글</li>
              <li onClick={handleLikeList}>관심글</li>
              <li onClick={handleProgressList}>진행중</li>
            </ul>
            <PostList postList={list} />
          </div>
          <div className="mypage--postcontainer"></div>
        </div>
      )}
    </>
  );
}
