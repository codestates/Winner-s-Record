import { useEffect, useState } from "react";
import { useHistory } from "react-router";
import { useDispatch } from "react-redux";
import { setUserInfo } from "../modules/userInfo";
import { setLogin } from "../modules/isLogin";
import axios from "axios";
import SetNicknameCompleteModal from "../components/Login/SetNicknameCompleteModal";
import LoadingIndicator from "../components/LoadingIndicator";
import dotenv from "dotenv";
dotenv.config();

export default function Redirect() {
  const dispatch = useDispatch();
  const history = useHistory();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const openModalHandler = () => {
    setIsModalOpen(!isModalOpen);
  };
  const [id, setId] = useState(null);
  const [type, setType] = useState(null);
  const [nickname, setNickname] = useState("");

  const [validation, setValidation] = useState({
    nickname: false,
    checkNickname: false,
  });

  const [message, setMessage] = useState(
    "닉네임은 2~7 자리 한글로 입력해주세요"
  );

  function isNickname(asValue) {
    var regExp = /^[가-힣]+$/;
    return regExp.test(asValue);
  }

  const handleOnblurName = () => {
    if (!isNickname(nickname)) {
      setMessage("한글만 입력해주세요");
      return;
    }
    if (nickname.length > 7 || nickname.length < 2) {
      setMessage("2~7 자로 입력해주세요");
      return;
    }
    axios
      .post("http://3.36.30.63/auth/nickname", { nickname }) //
      .then((res) => {
        setValidation({ ...validation, checkNickname: true });
        setMessage("사용 가능한 닉네임입니다");
      })
      .catch((err) => {
        setValidation({ ...validation, checkNickname: false });
        setMessage("중복된 닉네임입니다");
      });
  };

  const handleInputValue = (e) => {
    setNickname(e.target.value);
  };

  const handleSocialSignup = () => {
    axios
      .post(
        "http://3.36.30.63/auth/social",
        { type, id, nickname },
        { withCredentials: true }
      )
      .then((res) => {
        const { token, userdata } = res.data;
        localStorage.setItem("token", token);
        const accessToken = localStorage.getItem("token");
        if (accessToken) {
          dispatch(setLogin()); // 로그인 상태 변경
          dispatch(setUserInfo(userdata)); // 유저 정보 입력
          openModalHandler(); // 모달 열림
        }
      })
      .catch((err) => {
        console.log(err);
      });
    openModalHandler(); // 모달 열림
  };

  const handleKeyPress = (e) => {
    if (e.type === "keypress" && e.code === "Enter" && isValid) {
      handleSocialSignup();
    }
  };

  const isValid = validation.nickname && validation.checkNickname;

  useEffect(() => {
    async function login() {
      const url = new URL(window.location.href);
      const authorizationCode = url.searchParams.get("code");
      const result = await axios.post(
        `https://kauth.kakao.com/oauth/token?grant_type=authorization_code&client_id=${process.env.REACT_APP_KAKAO_ID}&redirect_uri=http://localhost:3000/redirect&code=${authorizationCode}`
      );
      const token = result.data.access_token;
      axios
        .get(`http://3.36.30.63/auth/kakao/callback?token=${token}`)
        .then((res) => {
          const { id, type } = res.data;
          if (!id) {
            const { token, userdata } = res.data;
            localStorage.setItem("token", token);
            const accessToken = localStorage.getItem("token");
            if (accessToken) {
              dispatch(setLogin()); // 로그인 상태 변경
              dispatch(setUserInfo(userdata)); // 유저 정보 입력
              history.replace("/main");
            }
          } else {
            setId(id);
            setType(type);
            setIsLoading(false);
          }
        });
    }
    login();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setValidation({
      ...validation,
      nickname:
        isNickname(nickname) && nickname.length >= 2 && nickname.length < 8,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [nickname]);
  return (
    <>
      {isLoading ? (
        <LoadingIndicator />
      ) : (
        <div className="redirect--background">
          <div className="signup--logo">
            <div
              onClick={() => {
                history.replace("/main");
              }}
            >
              로고
            </div>
          </div>
          <div className="redirect--greeting">
            <div>환영합니다 !</div>
            <div>Winner's Record에 사용하실 닉네임을 설정해 주세요</div>
            <div>
              최초 1회만 설정해 주시면 되며, 마이페이지에서 변경 가능합니다
            </div>
          </div>
          <div className="signup--inputcontainer">
            <input
              className="signup--input"
              type="nickname"
              placeholder="닉네임"
              onBlur={handleOnblurName}
              onChange={handleInputValue}
              onKeyPress={handleKeyPress}
            />
            {message === "닉네임은 2~7 자리 한글로 입력해주세요" ? (
              <div className="signup--default-message">{message}</div>
            ) : message === "사용 가능한 닉네임입니다" ? (
              <div className="signup--ok-message">{message}</div>
            ) : (
              <div className="signup--error-message">{message}</div>
            )}
            <div className="signup--btncontainer">
              {isValid ? (
                <button
                  className="signup--btn-ok"
                  type="submit"
                  onClick={handleSocialSignup}
                >
                  설정하기
                </button>
              ) : (
                <button className="signup--btn">설정하기</button>
              )}
              <SetNicknameCompleteModal
                isModalOpen={isModalOpen}
                openModalHandler={openModalHandler}
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
