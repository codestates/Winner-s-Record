import { Link } from "react-router-dom";

const Error = () => {
  return (
    <>
      <div>잘못된 접근입니다.</div>
      <Link to="/main">
        <button>메인페이지로 돌아가기</button>
      </Link>
    </>
  );
};

export default Error;
