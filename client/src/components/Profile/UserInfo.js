import { useHistory } from "react-router";
import { useState, useEffect } from "react";
import EditPhotoModal from "./EditPhotoModal";

export default function UserInfo({ isMypage, profileData, editPhoto }) {
  const history = useHistory();
  const [File, setFile] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModalHandler = () => {
    setIsModalOpen(!isModalOpen);
  };

  return (
    <div className="profile--container">
      <div className="profile--photo">
        <img src={profileData.img} alt="profile" />
        {isMypage ? <div onClick={openModalHandler}>사진 변경</div> : null}
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
      <EditPhotoModal
        File={File}
        setFile={setFile}
        editPhoto={editPhoto}
        prevPhoto={profileData.img}
        openModalHandler={openModalHandler}
        isModalOpen={isModalOpen}
      />
    </div>
  );
}
