import axios from "axios";
import S3 from "react-aws-s3";
import { v4 } from "uuid";
import dotenv from "dotenv";
import { useState, useRef } from "react";
import { useDispatch } from "react-redux";
import { setUserInfo } from "../../modules/userInfo";
dotenv.config();

export default function EditPhotoModal({
  File,
  setFile,
  isModalOpen,
  openModalHandler,
  prevPhoto,
  editPhoto,
}) {
  const dispatch = useDispatch();

  const fileInput = useRef(null);
  const [preview, setPreview] = useState(prevPhoto);

  const imgOnchange = (e) => {
    const imageFile = e.target.files[0];
    setFile(imageFile);
    const data = [];
    data.push(imageFile);
    if (imageFile) {
      const imageURL = window.URL.createObjectURL(
        new Blob(data, { type: "image" })
      );
      setPreview(imageURL);
    } else {
      setPreview(
        "https://winnersrecordimagestorage.s3.ap-northeast-2.amazonaws.com/%EC%9E%90%EB%A3%8C/%E1%84%87%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A1%E1%84%8C%E1%85%B5%E1%86%AB.png"
      );
    }
  };

  const config = {
    bucketName: process.env.REACT_APP_S3_BUCKET,
    region: process.env.REACT_APP_REGION,
    accessKeyId: process.env.REACT_APP_ACCESS_KEY,
    secretAccessKey: process.env.REACT_APP_SECRET_ACCESS_KEY,
  };

  const ReactS3Client = new S3(config);
  const newFileName = v4();

  const uploadFile = async (file) => {
    await ReactS3Client.uploadFile(file, newFileName)
      .then((data) => {
        const path = data.location;
        editPhoto(path);
        handleEdit(path);
      })
      .catch((err) => console.error(err));
  };

  const handleEdit = (path) => {
    const oldToken = localStorage.getItem("token");
    axios
      .put(
        "https://server.winner-s-record.link/auth/img",
        { img: path },
        { headers: { authorization: `Bearer ${oldToken}` } }
      )
      .then((res) => {
        const { token, userdata } = res.data;
        localStorage.removeItem("token", oldToken);
        localStorage.setItem("token", token);
        dispatch(setUserInfo(userdata));
        setPreview(path);
        setFile(null);
        openModalHandler();
      });
  };

  const handleCancle = () => {
    setFile(null);
    setPreview(prevPhoto);
    openModalHandler();
  };

  return (
    <>
      {isModalOpen ? (
        <div className="modal--backdrop">
          <div className="modal--view-photo">
            <div className="modal--top">
              <img
                alt="camera"
                src="https://winnersrecordimagestorage.s3.ap-northeast-2.amazonaws.com/%EC%9E%90%EB%A3%8C/%E1%84%89%E1%85%A1%E1%84%8C%E1%85%B5%E1%86%AB.png"
              />
            </div>
            <div className="modal--uploadcontainer">
              <input
                className="modal--file"
                ref={fileInput}
                type="file"
                accept="image/*"
                name="file"
                onChange={(e) => imgOnchange(e)}
              />

              <img className="modal--preview" src={preview} alt="profile" />
              <button
                className="modal--twobtn"
                onClick={() => fileInput.current.click()}
              >
                파일 업로드
              </button>
            </div>
            <div className="modal--btnContainer">
              <button
                className="modal--twobtn"
                onClick={() => {
                  setPreview(preview);
                  handleCancle();
                }}
              >
                돌아가기
              </button>
              {File ? (
                <button
                  className="modal--twobtn-ok"
                  onClick={() => {
                    uploadFile(File);
                  }}
                >
                  변경하기
                </button>
              ) : (
                <button className="modal--twobtn">변경하기</button>
              )}
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
