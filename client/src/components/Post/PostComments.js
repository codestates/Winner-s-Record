import axios from "axios";
import { useEffect, useState } from "react";

const PostComments = ({ board, setPostInfo }) => {
  const [input, setInput] = useState("");

  useEffect(() => {
    console.log(input);
  }, [input]);

  const postComment = () => {
    const Authorization = `Bearer ${localStorage.getItem("token")}`;
    const endpoint = `http://localhost:8080/`;
    axios.post(endpoint, { text: input }, { Authorization });
  };

  return (
    <div className="post--comments">
      <ul>
        {board.map((e) => {
          return (
            <li className="post--comments--content">
              <div className="img">
                <img src={e.img} alt={e.nickname} />
              </div>
              <div className="name">{e.nickname}</div>
              <div className="text">{e.text}</div>
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
            } else {
              setInput(e.target.value);
            }
          }}
        />
        <div onClick={postComment}>입력</div>
      </div>
    </div>
  );
};

export default PostComments;
