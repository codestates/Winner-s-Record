import PostListContent from "./PostListContent";

const PostList = ({ postList }) => {
  return (
    <div className="list--container">
      {postList.map((e) => {
        return <PostListContent postInfo={e} />;
      })}
    </div>
  );
};

export default PostList;
