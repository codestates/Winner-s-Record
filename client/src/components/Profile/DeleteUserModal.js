import { useHistory } from "react-router";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setLogout } from "../../modules/isLogin";
import { deleteUserInfo } from "../../modules/userInfo";
import axios from "axios";

export default function DeleteUserModal({ isModalOpen, openModalHandler }) {
  const dispatch = useDispatch();
  const history = useHistory();
  const [input, setInput] = useState("");
  const handleInputValue = (e) => {
    setInput(e.target.value);
  };

  const [errorMessage, setErrorMessage] =
    useState(`'동의합니다'를 입력해주세요`);

  const handleDelete = () => {
    const token = localStorage.getItem("token");
    axios
      .delete("https://3.36.30.63/auth", {
        headers: { authorization: `Bearer ${token}` },
      })
      .then((res) => {
        setInput("");
        localStorage.clear();
        dispatch(setLogout());
        dispatch(deleteUserInfo());
        history.replace("/main");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleCancle = () => {
    openModalHandler();
    setInput("");
  };

  const handleKeyPress = (e) => {
    if (e.type === "keypress" && e.code === "Enter" && input === "동의합니다") {
      handleDelete();
    }
  };

  useEffect(() => {
    if (input === "동의합니다") {
      setErrorMessage(
        "버튼을 클릭하시면 모든 데이터가 삭제되고 메인페이지로 이동합니다"
      );
    } else {
      setErrorMessage(`'동의합니다'를 입력해주세요`);
    }
  }, [input]);
  return (
    <>
      {isModalOpen ? (
        <div className="modal--backdrop">
          <div className="modal--view">
            <div>정말 탈퇴하시겠습니까?</div>
            <div>
              탈퇴 시 개인 정보 및 작성했던 모든 데이터는 복구할 수 없습니다
            </div>
            <input
              placeholder="동의합니다"
              onChange={handleInputValue}
              onKeyPress={handleKeyPress}
            />
            <div>{errorMessage}</div>
            <div className="modal--btnContainer">
              <button onClick={handleCancle}>취소하기</button>
              {input === "동의합니다" ? (
                <button style={{ color: "green" }} onClick={handleDelete}>
                  탈퇴하기
                </button>
              ) : (
                <button>탈퇴하기</button>
              )}
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
