import axios from "axios";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { setUserInfo } from "../../modules/userInfo";

export default function EditPhotoModal({ isModalOpen, openModalHandler }) {
  const dispatch = useDispatch();
  const [preview, setPreview] = useState(null);

  const imgOnchange = (event) => {
    const imageFile = event.target.files[0];
    const imageURL = URL.createObjectURL(imageFile);
    setPreview(imageURL);
  };

  const handleEdit = () => {
    const oldToken = localStorage.getItem("token");
    axios
      .post(
        "http://localhost:8080/auth/img",
        // { img },
        { headers: { authorization: `Bearer ${oldToken}` } }
      )
      .then((res) => {
        const { token, userdata } = res.data;
        localStorage.removeItem("token", oldToken);
        localStorage.setItem("token", token);
        dispatch(setUserInfo(userdata));
      });
  };

  return (
    <>
      {isModalOpen ? (
        <div className="modal--backdrop">
          <div className="modal--view">
            <div>
              <input
                // ref={profileImgInput}
                type="file"
                accept="image/*"
                name="file"
                onChange={imgOnchange}
              />
              <img src={preview} />
            </div>
            <div className="modal--btnContainer">
              <button onClick={openModalHandler}>돌아가기</button>
              <button onClick={handleEdit}>변경하기</button>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
