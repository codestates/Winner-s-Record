import { Link } from "react-router-dom";

const PostUserInfo = ({ userData }) => {
  return (
    <div className="post--userinfo">
      <Link to={`/profile/${userData.userId}`}>
        <div className="post--userinfo--inner">
          <div className="img">
            <img src={userData.img} alt={userData.nickname} />
          </div>
          <div className="name">{userData.nickname}</div>
        </div>
      </Link>
    </div>
  );
};

export default PostUserInfo;
