import axios from "axios";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router";
import uuid from "react-uuid";

const PostComments = ({ board, postInfo, setPostInfo }) => {
  const userInfo = useSelector((state) => state.userInfo);
  const { postId } = useParams();
  const [input, setInput] = useState("");

  const postComment = () => {
    const Authorization = `Bearer ${localStorage.getItem("token")}`;
    if (input === "") {
      // do nothing
    } else {
      axios
        .post(
          "https://server.winner-s-record.link/board",
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
    }
  };

  const deleteComment = (boardId) => {
    const Authorization = `Bearer ${localStorage.getItem("token")}`;
    axios
      .delete(`https://server.winner-s-record.link/board/${boardId}`, {
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
        <div className="title">
          <span>댓글</span>
        </div>
        {board.map((e) => {
          console.log("postinfo", postInfo);
          if (userInfo.nickname === e.nickname) {
            return (
              <li className="post--comments--content" key={uuid()}>
                <div
                  className="btn"
                  onClick={() => {
                    deleteComment(e.id);
                  }}
                >
                  <i className="fas fa-trash-alt" />
                </div>
                <div className="text mine">
                  <span>{e.text}</span>
                </div>
              </li>
            );
          } else {
            return (
              <li className="post--comments--content" key={uuid()}>
                <div className="userinfo">
                  <div className="img">
                    <img src={e.img} alt={e.nickname} />
                  </div>
                  <div className="name">{e.nickname}</div>
                </div>

                <div className="text">
                  <span>{e.text}</span>
                </div>
                {userInfo.userId === postInfo.userData.userId ? (
                  <div
                    className="btn"
                    onClick={() => {
                      deleteComment(e.id);
                    }}
                  >
                    <i className="fas fa-trash-alt" />
                  </div>
                ) : null}
              </li>
            );
          }
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
          placeholder={"댓글을 입력해주세요."}
        />
        <div onClick={postComment}>
          <i className="fas fa-paper-plane"></i>
        </div>
      </div>
    </div>
  );
};

export default PostComments;
