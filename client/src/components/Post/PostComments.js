import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router";

const PostComments = ({ board, postInfo, setPostInfo }) => {
  const { postId } = useParams();
  const [input, setInput] = useState("");

  const postComment = () => {
    const Authorization = `Bearer ${localStorage.getItem("token")}`;
    console.log(postId, input);
    console.log(Authorization);
    axios
      .post(
        "http://3.36.30.63/board",
        { docId: postId, text: input },
        { headers: { Authorization } }
      )
      .then((res) => {
        setPostInfo({ ...postInfo, board: res.data.board });
        setInput("");
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const deleteComment = (boardId) => {
    const Authorization = `Bearer ${localStorage.getItem("token")}`;
    axios
      .delete(`http://3.36.30.63/board/${boardId}`, {
        headers: { Authorization },
      })
      .then((res) => {
        if (res.status !== 204) {
          console.log("삭제 에러 발생");
        } else {
          const deleted = board.filter((data) => {
            return data.id !== boardId;
          });
          setPostInfo({ ...postInfo, board: deleted });
        }
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <div className="post--comments">
      <ul>
        {board.map((e) => {
          return (
            <li className="post--comments--content" key={e.id}>
              <div className="img">
                <img src={e.img} alt={e.nickname} />
              </div>
              <div className="name">{e.nickname}</div>
              <div className="text">{e.text}</div>
              <div
                className="btn"
                onClick={() => {
                  deleteComment(e.id);
                }}
              >
                삭제
              </div>
            </li>
          );
        })}
      </ul>
      <div className="post--comments--input">
        <input
          type="text"
          onKeyUp={(e) => {
            if (e.key === "Enter") {
              postComment();
            }
          }}
          onChange={(e) => {
            setInput(e.target.value);
          }}
          value={input}
        />
        <div onClick={postComment}>입력</div>
      </div>
    </div>
  );
};

export default PostComments;
