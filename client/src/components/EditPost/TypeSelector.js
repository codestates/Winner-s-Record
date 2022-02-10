import { useEffect, useState } from "react";

export default function TypeSelector({ type, setType }) {
  const [isDropOpen, setIsDropOpen] = useState(false);
  const [selected, setSelected] = useState("분류");

  useEffect(() => {
    if (type === "match") {
      setSelected("매치");
    }
    if (type === "trade") {
      setSelected("거래");
    }
  }, [type]);

  return (
    <ul className="post--eventselector">
      <div
        className="post--dropdownselected"
        onClick={() => {
          setIsDropOpen(true);
          setSelected("분류");
        }}
      >
        <span>{selected}</span>
      </div>
      {isDropOpen ? (
        <ul className="dropdown--container">
          <li
            onClick={(e) => {
              setIsDropOpen(false);
              setSelected(e.target.textContent);
              setType("match");
            }}
          >
            매치
          </li>
          <li
            onClick={(e) => {
              setIsDropOpen(false);
              setSelected(e.target.textContent);
              setType("trade");
            }}
          >
            거래
          </li>
        </ul>
      ) : null}
    </ul>
  );
}
