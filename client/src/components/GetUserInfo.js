import axios from "axios";
import { useDispatch } from "react-redux";
import { setUserInfo } from "../modules/userInfo";
import { setLogin } from "../modules/isLogin";

const GetUserInfo = () => {
  const dispatch = useDispatch();
  const token = localStorage.getItem("token");
  if (token) {
    axios
      .get("http://ec2-3-35-18-23.ap-northeast-2.compute.amazonaws.com/auth/", {
        headers: { authorization: `Bearer ${token}` },
      })
      .then((res) => {
        const { userdata } = res.data;
        dispatch(setLogin()); // 로그인 상태 변경
        dispatch(setUserInfo(userdata)); // 유저 정보 입력
      })
      .catch((err) => {
        console.log(err);
      });
  }
};
