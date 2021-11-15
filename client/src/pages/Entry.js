import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import BackButton from "../components/BackButton";
import EntryPlayer from "../components/Entry/EntryPlayer";
import { ApplyBtn, FixBtn } from "../components/Entry/EntryPrimaryButton";
import NeedLoginModal from "../components/NeedLoginModal";
import { modalOff } from "../modules/isModalOpen";
import Header from "../components/Header";
import Footer from "../components/Footer";
import TopButton from "../components/TopButton";

const Entry = () => {
  const { postId } = useParams();
  const dispatch = useDispatch();

  const { userInfo, modalText, isModalOpen } = useSelector((state) => ({
    userInfo: state.userInfo,
    modalText: state.modalText,
    isModalOpen: state.isModalOpen,
  }));
  const [fixed, setFixed] = useState([]);
  const [applied, setApplied] = useState([]);
  const [host, setHost] = useState({});
  const [postType, setPostType] = useState("match");
  const [eventType, setEventType] = useState("");

  const [loginModal, setLoginModal] = useState(false);

  const getData = () => {
    const Authorization = `Bearer ${localStorage.getItem("token")}`;
    axios
      .get(`https://server.winner-s-record.link/entry/${postId}`, {
        headers: { Authorization },
      })
      .then((res) => {
        const host = res.data.data.filter((e) => {
          return e.status === "호스트" ? true : false;
        });

        const fixed = res.data.data.filter((e) => {
          return e.status === "확정" && e.userId !== host[0].userId
            ? true
            : false;
        });
        const applied = res.data.data.filter((e) => {
          return e.status === "대기" && e.userId !== host[0].userId
            ? true
            : false;
        });
        setHost(host[0]);
        setFixed(fixed);
        setApplied(applied);
        setPostType(res.data.doctype);
        setEventType(res.data.docevent);
      });
  };
  useEffect(() => {
    dispatch(modalOff());
    getData();
    // eslint-disable-next-line
  }, []);

  return (
    <div className="entry--container">
      <Header />
      <div className="entry--inner">
        <div className="title">참가 확정 인원</div>
        <ul className="player--container">
          {fixed.map((userData) => {
            return (
              <EntryPlayer
                key={userData.userId}
                postId={postId}
                userData={userData}
                setApplied={setApplied}
                fixed={fixed}
                setFixed={setFixed}
                hostId={host.userId}
                setLoginModal={setLoginModal}
                postType={postType}
              />
            );
          })}
        </ul>
        <div className="title">참가 신청 인원</div>
        <ul className="player--container">
          {applied.map((userData) => {
            return (
              <EntryPlayer
                key={userData.userId}
                postId={postId}
                userData={userData}
                setApplied={setApplied}
                fixed={fixed}
                setFixed={setFixed}
                hostId={host.userId}
                setLoginModal={setLoginModal}
                postType={postType}
              />
            );
          })}
        </ul>

        {userInfo.userId === host.userId ? (
          <FixBtn fixed={fixed} postType={postType} eventType={eventType} />
        ) : (
          <ApplyBtn
            hostId={host.userId}
            postId={postId}
            fixed={fixed}
            applied={applied}
            setApplied={setApplied}
            setLoginModal={setLoginModal}
          />
        )}
      </div>

      <Footer />
      <BackButton />
      <TopButton />
      {isModalOpen ? (
        <div className="modal--backdrop">
          <div className="modal--view entry">
            <div className="modal--text--container">
              <div className="text">{modalText}</div>
            </div>
            <div className="modal--btn--container">
              <div
                className="btn"
                onClick={() => {
                  dispatch(modalOff());
                }}
              >
                닫기
              </div>
            </div>
          </div>
        </div>
      ) : null}
      <NeedLoginModal isModalOpen={loginModal} setIsModalOpen={setLoginModal} />
    </div>
  );
};

export default Entry;
