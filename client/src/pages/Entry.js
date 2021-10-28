import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router";
import EntryPlayer from "../components/Entry/EntryPlayer";
import { ApplyBtn, FixBtn } from "../components/Entry/EntryPrimaryButton";
import NeedLoginModal from "../components/NeedLoginModal";

const Entry = () => {
  const { postId } = useParams();
  const userInfo = useSelector((state) => state.userInfo);
  const [fixed, setFixed] = useState([]);
  const [applied, setApplied] = useState([]);
  const [host, setHost] = useState({});

  const [loginModal, setLoginModal] = useState(false);

  const [isModalActive, setIsModalActive] = useState(false);
  const [modalText, setModalText] = useState("권한이 없습니다.");

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
          setModalText={setModalText}
          setLoginModal={setLoginModal}
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
              setModalText={setModalText}
              setLoginModal={setLoginModal}
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
              setModalText={setModalText}
              setLoginModal={setLoginModal}
            />
          );
        })}
      </ul>

      {userInfo.userId === host.userId ? (
        <FixBtn
          fixed={fixed}
          setIsModalActive={setIsModalActive}
          setModalText={setModalText}
        />
      ) : (
        <ApplyBtn
          postId={postId}
          fixed={fixed}
          setApplied={setApplied}
          setLoginModal={setLoginModal}
          setIsModalActive={setIsModalActive}
          setModalText={setModalText}
        />
      )}

      {isModalActive ? (
        <div className={"modal--backdrop"}>
          <div className={"modal--view"}>
            <div className="modal--text">{modalText}</div>
            <div
              className="modal--btn"
              onClick={() => {
                setIsModalActive(false);
              }}
            >
              닫기
            </div>
          </div>
        </div>
      ) : null}
      <NeedLoginModal isModalOpen={loginModal} setIsModalOpen={setLoginModal} />
    </div>
  );
};

export default Entry;
