import { useState } from "react";

export default function EventSelector({ setEvent }) {
  const [isDropOpen, setIsDropOpen] = useState(false);
  const [selected, setSelected] = useState("종목");

  return (
    <ul>
      <li
        onClick={() => {
          setIsDropOpen(true);
          setSelected("종목");
        }}
      >
        {selected}
      </li>
      {isDropOpen ? (
        <>
          <li
            onClick={(e) => {
              setIsDropOpen(false);
              setSelected(e.target.textContent);
              setEvent("badminton");
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
        </>
      ) : null}
    </ul>
  );
}
