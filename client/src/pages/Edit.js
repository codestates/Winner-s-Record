import { useState, useEffect } from "react";
import { useHistory } from "react-router";
import EditCompleteModal from "../components/EditCompleteModal";
import axios from "axios";

export default function Edit() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModalHandler = () => {
    setIsModalOpen(!isModalOpen);
  };

  const [editInfo, setEditInfo] = useState({
    username: "",
    password: "",
    checkPW: "",
  });

  const [validation, setValidation] = useState({
    username: false,
    password: false,
    checkPW: false,
  });

  const [message, setMessage] = useState({
    username: "이름을 입력해주세요",
    password: "비밀번호는 8자리 이상, 숫자, 문자, 특수문자가 포함되어야 합니다",
    checkPW: "비밀번호를 입력해주세요",
  });

  const history = useHistory();
  //   const dispatch = useDispatch();

  function isUsername(asValue) {
    var regExp = /^[가-힣]+$/;
    return regExp.test(asValue);
  }

  function isPassword(asValue) {
    var regExp =
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
    return regExp.test(asValue);
  }

  const handleOnblurName = (key) => (e) => {
    if (!isUsername(editInfo.username)) {
      setMessage({ ...message, username: "한글만 입력해주세요" });
      return;
    }
    if (editInfo.username.length > 7 || editInfo.username.length < 2) {
      setMessage({ ...message, username: "2~7자로 입력해주세요" });
      return;
    }
    axios
      .post("", { [key]: e.target.value }) //
      .then((res) => {
        setValidation({ ...validation, username: true });
        setMessage({ ...message, username: "사용 가능한 닉네임입니다" });
      })
      .catch((err) => {
        setValidation({ ...validation, username: false });
        setMessage({ ...message, username: "중복된 닉네임입니다" });
      });
  };
  const handleInputValue = (key) => (e) => {
    setEditInfo({ ...editInfo, [key]: e.target.value });
  };

  const handleEdit = () => {
    const { username, password } = editInfo;
    const token = localStorage.getItem("token");
    axios
      .put(
        "",
        { username, password },
        { headers: { authorization: `Bearer ${token}` } }
      )
      .then((res) => {
        const { userId, userName, accessToken } = res.data.data;
        localStorage.removeItem("token");
        localStorage.setItem("token", accessToken);
        localStorage.setItem("userId", userId);
        localStorage.setItem("userName", userName);
        if (token) {
          //   dispatch(setUserInfo({ token, userId, userName }));
          //   handleEditInfo();
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleKeyPress = (e) => {
    if (e.type === "keypress" && e.code === "Enter" && isValid) {
      handleEdit();
    }
  };

  const isValid =
    validation.username && validation.password && validation.checkPW;

  useEffect(() => {
    setMessage({
      ...message,
      password:
        editInfo.password.length >= 8
          ? isPassword(editInfo.password)
            ? "사용할 수 있는 비밀번호 입니다"
            : "비밀번호는 숫자, 문자, 특수문자가 포함되어야합니다"
          : "비밀번호는 8자리 이상, 숫자, 문자, 특수문자가 포함되어야 합니다",
      checkPW:
        editInfo.checkPW.length >= editInfo.password.length &&
        editInfo.password.length
          ? editInfo.checkPW === editInfo.password
            ? "비밀번호가 일치합니다"
            : "비밀번호가 불일치합니다"
          : "비밀번호를 입력해주세요",
    });
    setValidation({
      ...validation,
      username: isUsername(editInfo.username) && editInfo.username.length >= 2,
      password: isPassword(editInfo.password),
      checkPW: editInfo.password === editInfo.checkPW,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editInfo]);
  return (
    <div>
      <div className="inputContainer">
        <input
          type="username"
          placeholder="닉네임"
          onBlur={handleOnblurName("username")}
          onChange={handleInputValue("username")}
          onKeyPress={handleKeyPress}
        />
        {message.username === "한글만 입력해주세요" ? (
          <div>{message.username}</div>
        ) : (
          <div>{message.username}</div>
        )}
        <input
          type="password"
          placeholder="새 비밀번호"
          onChange={handleInputValue("password")}
          onKeyPress={handleKeyPress}
        />
        {message.password ===
        "비밀번호는 8자리 이상, 숫자, 문자, 특수문자가 포함되어야 합니다" ? (
          <div>{message.password}</div>
        ) : message.password === "사용할 수 있는 비밀번호 입니다" ? (
          <div>{message.password}</div>
        ) : (
          <div>{message.password}</div>
        )}
        <input
          type="password"
          placeholder="새 비밀번호 확인"
          onChange={handleInputValue("checkPW")}
          onKeyPress={handleKeyPress}
        />
        {message.checkPW === "비밀번호가 불일치합니다" ? (
          <div>{message.checkPW}</div>
        ) : (
          <div>{message.checkPW}</div>
        )}
      </div>
      <div className="btnContainer">
        <button onClick={() => history.push("/main")}>돌아가기</button>
        {isValid ? (
          <button style={{ color: "green" }} type="submit" onClick={handleEdit}>
            가입하기
          </button>
        ) : (
          <button onClick={openModalHandler}>가입하기</button> // onclick 옮기기
        )}
        <EditCompleteModal
          isModalOpen={isModalOpen}
          openModalHandler={openModalHandler}
        />
      </div>
    </div>
  );
}
