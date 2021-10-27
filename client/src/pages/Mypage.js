import { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { setUserInfo } from "../modules/userInfo";
import { setLogin } from "../modules/isLogin";
import EditPhotoModal from "../components/Profile/EditPhotoModal";
import LoadingIndicator from "../components/LoadingIndicator";
import Ranking from "../components/Profile/Ranking";
import DocList from "../components/DocList";
import Error from "./Error";
import axios from "axios";

export default function Profile() {
  const { userId } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [profileData, setProfileData] = useState({
    id: "",
    nickname: "",
    img: "",
  });

  const userInfo = useSelector((state) => state.userInfo);
  const isMypage = profileData.userId === userInfo.userId;
  const history = useHistory();
  const dispatch = useDispatch();
  const openModalHandler = () => {
    setIsModalOpen(!isModalOpen);
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    axios
      .get(`http://localhost:8080/auth/${userId}`, {
        headers: { authorization: `Bearer ${token}` },
      })
      .then((res) => {
        const { userData, profileData } = res.data;
        setProfileData(profileData);
        if (token) {
          dispatch(setLogin()); // 로그인 상태 변경
          dispatch(setUserInfo(userData)); // 유저 정보 입력
        }
      })
      .catch((err) => {
        console.log(err);
      });
    setIsLoading(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {isLoading ? (
        <LoadingIndicator />
      ) : profileData.userId ? (
        <div>
          <div className="profile--container">
            <div className="profile--photo">
              <img src={profileData.img} alt="profile" />
              {isMypage ? (
                <div onClick={openModalHandler}>사진 변경</div>
              ) : null}
            </div>
            <span className="profile--username">{profileData.nickname}</span>
            {isMypage ? (
              <span
                className="profile--edit"
                onClick={() => history.push("/profile/edit")}
              >
                수정
              </span>
            ) : null}
          </div>
          <Ranking nickname={profileData.nickname} />
          <DocList userId={userId} isMypage={isMypage} />
          <EditPhotoModal
            openModalHandler={openModalHandler}
            isModalOpen={isModalOpen}
          />
        </div>
      ) : (
        <Error />
      )}
    </>
  );
}
