import { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { setUserInfo } from "../modules/userInfo";
import { setLogin } from "../modules/isLogin";
import PostList from "../components/Main/PostList";
import EditPhotoModal from "../components/Profile/EditPhotoModal";
import LoadingIndicator from "../components/LoadingIndicator";
import axios from "axios";

export default function Profile() {
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
          <div className="profile--container">
            <div className="profile--photo">
              <img src={profileData.img} alt="profile" />
              {isValid ? <div onClick={openModalHandler}>사진 변경</div> : null}
            </div>
            <span className="profile--username">{profileData.nickname}</span>
            {isValid ? (
              <span
                className="profile--edit"
                onClick={() => history.push("/profile/edit")}
              >
                수정
              </span>
            ) : null}
          </div>
          <div className="profile--rankingcontainer">
            <div className="profile--rankingtap">
              <ul>
                <li>테니스</li>
                <li>스쿼시</li>
                <li>배드민턴</li>
                <li>탁구</li>
              </ul>
            </div>
            <div className="profile--ranking">위</div>
            <div className="profile--score">승 패 점</div>
          </div>
          <div className="profile--tap">
            <ul>
              <li onClick={handleCreatedList}>작성글</li>
              {isValid ? <li onClick={handleLikeList}>관심글</li> : null}
              <li onClick={handleProgressList}>진행중</li>
            </ul>
            <PostList postList={list} />
          </div>
          <div className="profile--postcontainer"></div>
          <EditPhotoModal
            openModalHandler={openModalHandler}
            isModalOpen={isModalOpen}
          />
        </div>
      )}
    </>
  );
}
