import axios from "axios";
import { useEffect } from "react";

export default function EventTap({ setList, setEvent }) {
  const handleList = (event) => {
    axios
      .get(`http://3.36.30.63/rank?event=${event}&nickname=all`)
      .then((res) => {
        setEvent(event);
        setList(res.data.data);
        console.log(res.data.data);
      })
      .catch((err) => {
        console.log(err);
        setList([]);
      });
  };

  useEffect(() => {
    handleList("tennis");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div>
      <ul>
        <li onClick={() => handleList("tennis")}>테니스</li>
        <li onClick={() => handleList("squash")}>스쿼시</li>
        <li onClick={() => handleList("badminton")}>배드민턴</li>
        <li onClick={() => handleList("pingpong")}>탁구</li>
      </ul>
    </div>
  );
}
