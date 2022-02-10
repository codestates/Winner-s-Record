import { useState, useEffect } from "react";

export default function EventSelector({ event, setEvent }) {
  const [isDropOpen, setIsDropOpen] = useState(false);
  const [selected, setSelected] = useState("종목");

  useEffect(() => {
    if (event === "tennis") {
      setSelected("테니스");
    }
    if (event === "squash") {
      setSelected("스쿼시");
    }
    if (event === "badminton") {
      setSelected("배드민턴");
    }
    if (event === "pingpong") {
      setSelected("탁구");
    }
  }, [event]);

  return (
    <ul className="post--eventselector">
      <div
        className="post--dropdownselected"
        onClick={() => {
          setIsDropOpen(true);
          setSelected("종목");
        }}
      >
        <span> {selected}</span>
      </div>
      {isDropOpen ? (
        <ul className="dropdown--container">
          <li
            onClick={(e) => {
              setIsDropOpen(false);
              setSelected(e.target.textContent);
              setEvent("tennis");
            }}
          >
            테니스
          </li>
          <li
            onClick={(e) => {
              setIsDropOpen(false);
              setSelected(e.target.textContent);
              setEvent("squash");
            }}
          >
            스쿼시
          </li>
          <li
            onClick={(e) => {
              setIsDropOpen(false);
              setSelected(e.target.textContent);
              setEvent("badminton");
            }}
          >
            배드민턴
          </li>
          <li
            onClick={(e) => {
              setIsDropOpen(false);
              setSelected(e.target.textContent);
              setEvent("pingpong");
            }}
          >
            탁구
          </li>
        </ul>
      ) : null}
    </ul>
  );
}
