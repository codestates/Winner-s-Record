import axios from "axios";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router";
import { setUserInfo } from "../../modules/userInfo";

export default function EditPhotoModal({ isModalOpen, openModalHandler }) {
  const history = useHistory();
  const dispatch = useDispatch();
  const [img, setImg] = useState("");
  const handleEdit = () => {
    const oldToken = localStorage.getItem("token");
    axios
      .post(
        "http://localhost:8080/auth/img",
        { img },
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
            <div>프로필 사진을 변경해주세요</div>
            <div className="modal--btnContainer">
              <button onClick={openModalHandler}>돌아가기</button>
              <button onClick={() => history.replace("/mypage")}>
                변경하기
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
