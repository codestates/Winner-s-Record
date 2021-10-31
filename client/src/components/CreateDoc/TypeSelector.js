import { useState } from "react";

export default function TypeSelector({ setType }) {
  const [isDropOpen, setIsDropOpen] = useState(false);
  const [selected, setSelected] = useState("분류");

  return (
    <ul>
      <li
        onClick={() => {
          setIsDropOpen(true);
          setSelected("분류");
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
        </>
      ) : null}
    </ul>
  );
}
