import { useState } from "react";
import EditPhotoModal from "./EditPhotoModal";

export default function UserInfo({
  editHandler,
  isMypage,
  profileData,
  editPhoto,
}) {
  const [File, setFile] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModalHandler = () => {
    setIsModalOpen(!isModalOpen);
  };

  return (
    <>
      <div className="profile--top" />
      <div className="profile--photocontainer">
        <img className="profile--photo" src={profileData.img} alt="profile" />
        {isMypage ? (
          <i className="fas fa-camera fa-2x" onClick={openModalHandler}></i>
        ) : null}
      </div>
      <div className="profile--namecontainer">
        <span>{profileData.nickname}</span>
        {isMypage ? (
          <i className="fas fa-pencil-alt" onClick={editHandler}></i>
        ) : null}
      </div>
      <EditPhotoModal
        File={File}
        setFile={setFile}
        editPhoto={editPhoto}
        prevPhoto={profileData.img}
        openModalHandler={openModalHandler}
        isModalOpen={isModalOpen}
      />
    </>
  );
}
