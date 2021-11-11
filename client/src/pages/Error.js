import { Link } from "react-router-dom";
import Footer from "../components/Footer";
import Header from "../components/Header";

const Error = () => {
  return (
    <div className="error--container">
      <Header />
      <div className="error--inner">
        <span className="icon">
          <i className="fas fa-exclamation-triangle"></i>
        </span>
        <span className="message">잘못된 접근입니다.</span>
        <div className="btn colored">
          <Link to="/main">
            <span>메인페이지로 돌아가기</span>
          </Link>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Error;
