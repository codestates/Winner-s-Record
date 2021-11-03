import axios from "axios";
import { useState, useEffect } from "react";
import { useParams } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import { setUserInfo } from "../modules/userInfo";
import { setLogin } from "../modules/isLogin";
import EditUserInfo from "./EditUserInfo";
import LoadingIndicator from "../components/LoadingIndicator";
import UserInfo from "../components/Profile/UserInfo";
import ProfileRank from "../components/Profile/ProfileRank";
import DocList from "../components/Profile/DocList";
import Error from "./Error";

export default function Profile() {
  const { userId } = useParams();
  const [edit, setEdit] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [profileData, setProfileData] = useState({
    id: "",
    nickname: "",
    img: "",
  });
  const userInfo = useSelector((state) => state.userInfo);
  const isMypage = profileData.userId === userInfo.userId;
  const dispatch = useDispatch();

  const editHandler = () => {
    setEdit(!edit);
  };

  const editPhoto = (img) => {
    setProfileData({ ...profileData, img });
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

  useEffect(() => {
    if (isMypage) {
      setProfileData(userInfo);
    }
    // eslint-disable-next-line
  }, [userInfo]);

  return (
    <>
      {isLoading ? (
        <LoadingIndicator />
      ) : profileData.userId ? (
        edit ? (
          <EditUserInfo
            setProfileData={setProfileData}
            editHandler={editHandler}
          />
        ) : (
          <div className="profile--background">
            <UserInfo
              editHandler={editHandler}
              isMypage={isMypage}
              profileData={profileData}
              editPhoto={editPhoto}
            />
            <ProfileRank nickname={profileData.nickname} />
            <DocList userId={userId} isMypage={isMypage} />
          </div>
        )
      ) : (
        <Error />
      )}
    </>
  );
}
