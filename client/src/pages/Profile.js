import axios from "axios";
import { useState, useEffect } from "react";
import { useParams } from "react-router";
import { useSelector } from "react-redux";
import EditUserInfo from "./EditUserInfo";
import LoadingIndicator from "../components/LoadingIndicator";
import UserInfo from "../components/Profile/UserInfo";
import ProfileRank from "../components/Profile/ProfileRank";
import DocList from "../components/Profile/DocList";
import Error from "./Error";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function Profile({ match }) {
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

  const editHandler = () => {
    setEdit(!edit);
  };

  const editPhoto = (img) => {
    setProfileData({ ...profileData, img });
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    axios
      .get(`https://server.winner-s-record.link/auth/${userId}`, {
        headers: { authorization: `Bearer ${token}` },
      })
      .then((res) => {
        const { profileData } = res.data;
        setProfileData(profileData);
      })
      .catch((err) => {
        console.log(err);
      });
    setIsLoading(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [match.url]);

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
          <>
            <Header />
            <div className="profile--background">
              <UserInfo
                editHandler={editHandler}
                isMypage={isMypage}
                profileData={profileData}
                editPhoto={editPhoto}
              />
              <ProfileRank
                isMypage={isMypage}
                nickname={profileData.nickname}
              />
              <DocList userId={userId} isMypage={isMypage} />
            </div>
            <Footer />
          </>
        )
      ) : (
        <Error />
      )}
    </>
  );
}
