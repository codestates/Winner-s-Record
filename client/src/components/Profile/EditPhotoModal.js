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

  // const upload 여기서 업로드하고 그 주소 따온 다음에 포스트 요청 보내기

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
                type="file"
                accept="image/*"
                name="file"
                onChange={imgOnchange}
              />
              <div>
                <img src={preview} />
              </div>
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
