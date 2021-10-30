import axios from "axios";
import AWS, { S3 } from "aws-sdk";
import dotenv from "dotenv";
import { useState } from "react";
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
  const [preview, setPreview] = useState(prevPhoto);

  const imgOnchange = (e) => {
    const imageFile = e.target.files[0];
    setFile(imageFile);
    const data = [];
    data.push(imageFile);
    const imageURL = window.URL.createObjectURL(
      new Blob(data, { type: "image" })
    );
    setPreview(imageURL);
  };

  AWS.config.update({
    accessKeyId: process.env.REACT_APP_ACCESS_KEY,
    secretAccessKey: process.env.REACT_APP_SECRET_ACCESS_KEY,
  });

  const myBucket = new AWS.S3({
    params: { Bucket: process.env.REACT_APP_S3_BUCKET },
    region: process.env.REACT_APP_REGION,
  });

  const uploadFile = (file) => {
    const params = {
      ACL: "public-read",
      Body: file,
      Bucket: process.env.REACT_APP_S3_BUCKET,
      Key: file.name,
      ContentType: "image",
    };
    myBucket
      .putObject(params)
      .on("success", (res) => {
        const path = `${process.env.REACT_APP_BUCKET_URL}${res.request.httpRequest.path}`;
        editPhoto(path);
        handleEdit(path);
      })
      .send((err) => {
        if (err) console.log(err);
      });
  };

  const handleEdit = (path) => {
    const oldToken = localStorage.getItem("token");
    axios
      .put(
        "http://localhost:8080/auth/img",
        { img: path },
        { headers: { authorization: `Bearer ${oldToken}` } }
      )
      .then((res) => {
        const { token, userdata } = res.data;
        localStorage.removeItem("token", oldToken);
        localStorage.setItem("token", token);
        dispatch(setUserInfo(userdata));
        setFile(null);
        setPreview(null);
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
          <div className="modal--view">
            <div>
              <input
                type="file"
                accept="image/*"
                name="file"
                onChange={(e) => imgOnchange(e)}
              />
              <div>
                <img style={{ width: "50%", height: "50%" }} src={preview} />
              </div>
            </div>
            <div className="modal--btnContainer">
              <button onClick={handleCancle}>돌아가기</button>
              {File ? (
                <button
                  style={{ color: "green" }}
                  onClick={() => {
                    uploadFile(File);
                  }}
                >
                  변경하기
                </button>
              ) : (
                <button>변경하기</button>
              )}
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
