import axios from "axios";
import { useState, useEffect } from "react";
import { useParams } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import { setUserInfo } from "../modules/userInfo";
import { setLogin } from "../modules/isLogin";

import LoadingIndicator from "../components/LoadingIndicator";
import UserInfo from "../components/Profile/UserInfo";
import Ranking from "../components/Profile/Ranking";
import DocList from "../components/Profile/DocList";
import Error from "./Error";

export default function Profile() {
  const { userId } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [profileData, setProfileData] = useState({
    id: "",
    nickname: "",
    img: "",
  });
  const userInfo = useSelector((state) => state.userInfo);
  const isMypage = profileData.userId === userInfo.userId;
  const dispatch = useDispatch();

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
          <UserInfo isMypage={isMypage} profileData={profileData} />
          <Ranking nickname={profileData.nickname} />
          <DocList userId={userId} isMypage={isMypage} />
        </div>
      ) : (
        <Error />
      )}
    </>
  );
}
