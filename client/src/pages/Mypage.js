import { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { setUserInfo } from "../modules/userInfo";
import { setLogin } from "../modules/isLogin";
import PostList from "../components/Main/PostList";
import EditPhotoModal from "../components/Mypage/EditPhotoModal";
import LoadingIndicator from "../components/LoadingIndicator";
import axios from "axios";

export default function Mypage() {
  const { userId } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [list, setList] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [profileData, setProfileData] = useState({
    userId: "",
    nickname: "",
    img: "",
  });
  const userInfo = useSelector((state) => state.userInfo);
  const isValid = profileData.userId === userInfo.userId;
  const history = useHistory();
  const dispatch = useDispatch();
  const openModalHandler = () => {
    setIsModalOpen(!isModalOpen);
  };

  const handleCreatedList = () => {
    axios
      .get(`http://localhost:8080/doc?hostId=${userId}`)
      .then((res) => {
        console.log(res.data);
        setList(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleLikeList = () => {
    axios
      .get(`http://localhost:8080/like/${userId}`)
      .then((res) => {
        console.log(res.data);
        setList(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleProgressList = () => {
    axios
      .get(`http://localhost:8080/doc?guestId=${userId}`)
      .then((res) => {
        console.log(res.data);
        setList(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    console.log(token);
    axios
      .get(`http://localhost:8080/auth/${userId}`, {
        headers: { authorization: `Bearer ${token}` },
      })
      .then((res) => {
        const { userdata, profiledata } = res.data;
        setProfileData(profiledata);
        if (token) {
          dispatch(setLogin()); // 로그인 상태 변경
          dispatch(setUserInfo(userdata)); // 유저 정보 입력
        }
      })
      .catch((err) => {
        console.log(err);
      });
    handleCreatedList();
    setIsLoading(false);
  }, []);

  return (
    <>
      {isLoading ? (
        <LoadingIndicator />
      ) : (
        <div>
          <div className="mypage--profilecontainer">
            {isValid ? (
              <div className="mypage--photo" onClick={openModalHandler}>
                <img src={profileData.img} alt="profile" />
              </div>
            ) : (
              <div className="mypage--photo">
                <img src={profileData.img} alt="profile" />
              </div>
            )}
            <span className="mypage--username">{profileData.nickname}</span>
            {isValid ? (
              <span
                className="mypage--edit"
                onClick={() => history.push("/mypage/edit")}
              >
                수정
              </span>
            ) : null}
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
          <EditPhotoModal
            openModalHandler={openModalHandler}
            isModalOpen={isModalOpen}
          />
        </div>
      )}
    </>
  );
}
