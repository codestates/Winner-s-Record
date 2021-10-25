import { Link } from "react-router-dom";
import PostListContent from "./PostListContent";

const PostList = ({ postList }) => {
  return (
    <div className="list--container">
      {postList.map((e) => {
        return (
          <div className="list--link--container">
            <Link to={`/post/${e.id}`}>
              <PostListContent postInfo={e} />
            </Link>
          </div>
        );
      })}
    </div>
  );
};

export default PostList;
