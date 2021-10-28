import { Link } from "react-router-dom";

const PostUserInfo = ({ userData }) => {
  console.log(userData);
  return (
    <div className="post--userinfo--container">
      <Link to={`/profile/${userData.userId}`}>
        <div className="post--userinfo--inner">
          <div className="post--userinfo--img">
            <img src={userData.img} alt={userData.nickname} />
          </div>
          <div className="post--userinfo--name">{userData.nickname}</div>
        </div>
      </Link>
    </div>
  );
};

export default PostUserInfo;
