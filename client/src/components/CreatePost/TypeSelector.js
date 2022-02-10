import { useState } from "react";

export default function TypeSelector({ setType }) {
  const [isDropOpen, setIsDropOpen] = useState(false);
  const [selected, setSelected] = useState("분류");

  return (
    <ul className="post--typeselector">
      <div
        className="post--dropdownselected"
        onClick={() => {
          setIsDropOpen(!isDropOpen);
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
