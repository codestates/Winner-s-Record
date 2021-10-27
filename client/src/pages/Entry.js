import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import EntryPlayer from "../components/Entry/EntryPlayer";
import NeedLoginModal from "../components/NeedLoginModal";

const Entry = () => {
  const { postId } = useParams();
  const [fixed, setFixed] = useState([]);
  const [applied, setApplied] = useState([]);
  const [host, setHost] = useState({});
  const [isModalActive, setIsModalActive] = useState(false);
  const [isLoginModalActive, setIsLoginModalActive] = useState(false);

  const getData = () => {
    const Authorization = `Bearer ${localStorage.getItem("token")}`;
    axios
      .get(`http://localhost:8080/entry/${postId}`, {
        headers: { Authorization },
      })
      .then((res) => {
        const fixed = res.data.data.filter((e) => {
          return e.status === "확정" ? true : false;
        });
        const applied = res.data.data.filter((e) => {
          return e.status === "대기" ? true : false;
        });
        const host = res.data.data.filter((e) => {
          return e.status === "호스트" ? true : false;
        });

        setHost(host[0]);
        setFixed(fixed);
        setApplied(applied);
      });
  };
  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="entry--container">
      <div className="entry--nametag">참가 확정 인원</div>
      <ul className="entry--fixed--container">
        {/* 호스트가 가장 상단 */}
        <EntryPlayer
          postId={postId}
          userData={host}
          setApplied={setApplied}
          setFixed={setFixed}
          setIsModalActive={setIsModalActive}
          setIsLoginModalActive={setIsLoginModalActive}
        />
        {fixed.map((userData) => {
          return (
            <EntryPlayer
              postId={postId}
              userData={userData}
              setApplied={setApplied}
              setFixed={setFixed}
              hostId={host.userId}
              setIsModalActive={setIsModalActive}
              setIsLoginModalActive={setIsLoginModalActive}
            />
          );
        })}
      </ul>
      <div className="entry--nametag">참가 신청 인원</div>
      <ul className="entry--applied--container">
        {applied.map((userData) => {
          return (
            <EntryPlayer
              postId={postId}
              userData={userData}
              setApplied={setApplied}
              setFixed={setFixed}
              hostId={host.userid}
              setIsModalActive={setIsModalActive}
              setIsLoginModalActive={setIsLoginModalActive}
            />
          );
        })}
      </ul>
      {isModalActive ? (
        <div className={"modal--backdrop"}>
          <div className={"modal--view"}></div>
        </div>
      ) : null}
      <NeedLoginModal
        isModalOpen={isLoginModalActive}
        setIsModalOpen={setIsLoginModalActive}
      />
    </div>
  );
};

export default Entry;
