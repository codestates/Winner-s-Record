import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setUserInfo } from "../modules/userInfo";
import LoadingIndicator from "../components/LoadingIndicator";
import EditCompleteModal from "../components/Profile/EditCompleteModal";
import DeleteUserModal from "../components/Profile/DeleteUserModal";
import axios from "axios";

export default function EditUserInfo({ editHandler }) {
  const userInfo = useSelector((state) => state.userInfo);
  const dispatch = useDispatch();

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const openEditModalHandler = () => {
    setIsEditModalOpen(!isEditModalOpen);
  };

  const openDeleteModalHandler = () => {
    setIsDeleteModalOpen(!isDeleteModalOpen);
  };

  const [editInfo, setEditInfo] = useState({
    nickname: "",
    oldpassword: "",
    password: "",
    checkPW: "",
  });

  const [validation, setValidation] = useState({
    nickname: false,
    checkNickname: false,
    oldpassword: false,
    password: false,
    checkPW: false,
  });

  const [message, setMessage] = useState({
    nickname: "닉네임은 2~7 자리 한글로 입력해주세요",
    oldpassword: "현재 비밀번호를 입력해주세요",
    password: "비밀번호는 8자리 이상, 숫자, 문자, 특수문자가 포함되어야 합니다",
    checkPW: "비밀번호를 확인해주세요",
  });

  function isNickname(asValue) {
    var regExp = /^[가-힣]+$/;
    return regExp.test(asValue);
  }

  function isPassword(asValue) {
    var regExp =
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
    return regExp.test(asValue);
  }

  const handleOnblurName = () => {
    const { nickname } = editInfo;
    if (!isNickname(nickname)) {
      setMessage({ ...message, nickname: "한글만 입력해주세요" });
      return;
    }
    if (editInfo.nickname.length > 7 || editInfo.nickname.length < 2) {
      setMessage({ ...message, nickname: "2~7 자로 입력해주세요" });
      return;
    }
    axios
      .post("http://3.36.30.63/auth/nickname", { nickname })
      .then((res) => {
        setValidation({ ...validation, checkNickname: true });
        setMessage({ ...message, nickname: "사용 가능한 닉네임입니다" });
      })
      .catch((err) => {
        setValidation({ ...validation, checkNickname: false });
        setMessage({ ...message, nickname: "중복된 닉네임입니다" });
      });
  };

  const handleOnblurPassword = () => {
    const { oldpassword } = editInfo;
    if (!isPassword(oldpassword)) {
      setMessage({ ...message, oldpassword: "현재 비밀번호를 확인해주세요" });
      return;
    }
    const token = localStorage.getItem("token");
    axios
      .post(
        "http://3.36.30.63/auth/password",
        { password: oldpassword },
        { headers: { authorization: `Bearer ${token}` } }
      )
      .then((res) => {
        setValidation({ ...validation, oldpassword: true });
        setMessage({ ...message, oldpassword: "새 비밀번호를 입력해주세요" });
      })
      .catch((err) => {
        setValidation({ ...validation, oldpassword: false });
        setMessage({ ...message, oldpassword: "현재 비밀번호를 확인해주세요" });
      });
  };

  const handleInputValue = (key) => (e) => {
    setEditInfo({ ...editInfo, [key]: e.target.value });
  };

  const handleEditName = () => {
    const { nickname } = editInfo;
    const oldToken = localStorage.getItem("token");
    axios
      .put(
        "http://3.36.30.63/auth",
        { nickname, password: null },
        { headers: { authorization: `Bearer ${oldToken}` } }
      )
      .then((res) => {
        const { token, userdata } = res.data;
        localStorage.removeItem("token", oldToken);
        localStorage.setItem("token", token);
        setEditInfo({ ...editInfo, nickname: "" });
        setMessage({
          ...message,
          nickname: "닉네임은 2~7 자리 한글로 입력해주세요",
        });
        dispatch(setUserInfo(userdata));
        openEditModalHandler();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleEditPW = () => {
    const { password } = editInfo;
    const oldToken = localStorage.getItem("token");
    axios
      .put(
        "http://3.36.30.63/auth",
        { nickname: null, password },
        { headers: { authorization: `Bearer ${oldToken}` } }
      )
      .then((res) => {
        const { token, userdata } = res.data;
        localStorage.removeItem("token", oldToken);
        localStorage.setItem("token", token);
        setEditInfo({
          ...editInfo,
          oldpassword: "",
          password: "",
          checkPW: "",
        });
        dispatch(setUserInfo(userdata));
        openEditModalHandler();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleKeyPress = (e) => {
    const type = e.target.placeholder;
    if (e.type === "keypress" && e.code === "Enter") {
      if (type === "새 닉네임") {
        handleOnblurName();
        if (validation.checkNickname) {
          handleEditName();
        }
      } else {
        if (
          validation.oldpassword &&
          validation.password &&
          validation.checkPW
        ) {
          handleEditPW();
        }
      }
    }
  };

  const getUserInfo = () => {
    const Authorization = `Bearer ${localStorage.getItem("token")}`;
    axios
      .get("http://3.36.30.63/auth/me", { headers: { Authorization } })
      .then((res) => {
        dispatch(setUserInfo(res.data));
        setIsLoading(false);
      });
  };

  useEffect(() => {
    getUserInfo();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setMessage({
      ...message,
      password:
        editInfo.password.length >= 8
          ? editInfo.oldpassword === editInfo.password
            ? "현재 비밀번호와 같습니다"
            : isPassword(editInfo.password)
            ? "사용할 수 있는 비밀번호 입니다"
            : "비밀번호는 숫자, 문자, 특수문자가 포함되어야합니다"
          : "비밀번호는 8자리 이상, 숫자, 문자, 특수문자가 포함되어야 합니다",
      checkPW:
        editInfo.checkPW.length >= editInfo.password.length &&
        editInfo.password.length
          ? editInfo.checkPW === editInfo.password
            ? "비밀번호가 일치합니다"
            : "비밀번호가 불일치합니다"
          : "비밀번호를 확인해주세요",
    });
    setValidation({
      ...validation,
      nickname:
        isNickname(editInfo.nickname) &&
        editInfo.nickname.length >= 2 &&
        editInfo.nickname.length < 8,
      password:
        isPassword(editInfo.password) &&
        editInfo.password !== editInfo.oldpassword,
      checkPW: editInfo.password === editInfo.checkPW,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editInfo]);
  return (
    <>
      {isLoading ? (
        <LoadingIndicator />
      ) : (
        <div className="signup--container">
          <div className="signup--inputcontainer">
            <input
              className="edit--input"
              type="nickname"
              placeholder="새 닉네임"
              onBlur={handleOnblurName}
              onChange={handleInputValue("nickname")}
              onKeyPress={handleKeyPress}
              value={editInfo.nickname}
            />
            {message.nickname === "닉네임은 2~7 자리 한글로 입력해주세요" ? (
              <div className="signup--default-message">{message.nickname}</div>
            ) : message.nickname === "사용 가능한 닉네임입니다" ? (
              <div className="signup--ok-message">{message.nickname}</div>
            ) : (
              <div className="signup--error-message">{message.nickname}</div>
            )}
            <div className="edit--btncontainer">
              {validation.nickname && validation.checkNickname ? (
                <button className="signup--btn-ok" onClick={handleEditName}>
                  수정하기
                </button>
              ) : (
                <button className="signup--btn">수정하기</button>
              )}
            </div>
          </div>
          {userInfo.type === "web" ? (
            <div className="signup--inputcontainer">
              <input
                className="edit--input"
                type="password"
                placeholder="현재 비밀번호"
                onBlur={handleOnblurPassword}
                onChange={handleInputValue("oldpassword")}
                onKeyPress={handleKeyPress}
                value={editInfo.oldpassword}
              />
              {message.oldpassword === "현재 비밀번호를 입력해주세요" ? (
                <div className="signup--default-message">
                  {message.oldpassword}
                </div>
              ) : message.oldpassword === "새 비밀번호를 입력해주세요" ? (
                <div className="signup--ok-message">{message.oldpassword}</div>
              ) : (
                <div className="signup--error-message">
                  {message.oldpassword}
                </div>
              )}
              <input
                className="edit--input"
                type="password"
                placeholder="새 비밀번호"
                onChange={handleInputValue("password")}
                onKeyPress={handleKeyPress}
                value={editInfo.password}
              />
              {message.password ===
              "비밀번호는 8자리 이상, 숫자, 문자, 특수문자가 포함되어야 합니다" ? (
                <div className="signup--default-message">
                  {message.password}
                </div>
              ) : message.password === "사용할 수 있는 비밀번호 입니다" ? (
                <div className="signup--ok-message">{message.password}</div>
              ) : (
                <div className="signup--error-message">{message.password}</div>
              )}
              <input
                className="edit--input"
                type="password"
                placeholder="새 비밀번호 확인"
                onChange={handleInputValue("checkPW")}
                onKeyPress={handleKeyPress}
                value={editInfo.checkPW}
              />
              {message.checkPW === "비밀번호를 확인해주세요" ? (
                <div className="signup--default-message">{message.checkPW}</div>
              ) : message.checkPW === "비밀번호가 일치합니다" ? (
                <div className="signup--ok-message">{message.checkPW}</div>
              ) : (
                <div className="signup--error-message">{message.checkPW}</div>
              )}
              <div className="edit--btncontainer">
                {validation.oldpassword &&
                validation.password &&
                validation.checkPW ? (
                  <button className="signup--btn-ok" onClick={handleEditPW}>
                    수정하기
                  </button>
                ) : (
                  <button className="signup--btn">수정하기</button>
                )}
              </div>
            </div>
          ) : null}
          <div className="edit--btncontainer">
            <button className="signup--btn" onClick={editHandler}>
              돌아가기
            </button>
            <button
              className="edit--btn-delete"
              onClick={openDeleteModalHandler}
            >
              탈퇴하기
            </button>
            <EditCompleteModal
              isModalOpen={isEditModalOpen}
              openModalHandler={openEditModalHandler}
            />
            <DeleteUserModal
              isModalOpen={isDeleteModalOpen}
              openModalHandler={openDeleteModalHandler}
            />
          </div>
        </div>
      )}
    </>
  );
}
