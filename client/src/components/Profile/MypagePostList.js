import { Link } from "react-router-dom";
import PostListContent from "../Main/PostListContent";

const ProfilePostList = ({ postList }) => {
  return (
    <ul className="list--container">
      {postList.map((e) => {
        return (
          <li className="list--link--container" key={e.id}>
            <Link to={`/post/${e.id}`}>
              <PostListContent postInfo={e} />
            </Link>
          </li>
        );
      })}
    </ul>
  );
};

export default ProfilePostList;
