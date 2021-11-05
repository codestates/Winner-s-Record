import { useState } from "react";

const OptionSelector = ({ searchOption, setSearchOption }) => {
  const [selected, setSelected] = useState("글 제목");
  const [isClicked, setIsClicked] = useState(false);

  return (
    <div className="search--option--container">
      <div
        className={`search--dropdown--selector${isClicked ? " active" : ""}`}
        onClick={() => {
          setIsClicked(!isClicked);
        }}
      >
        <span>
          {selected}
          {isClicked ? (
            <i className="fas fa-chevron-up" />
          ) : (
            <i className="fas fa-chevron-down" />
          )}
        </span>
      </div>
      {isClicked ? (
        <ul className="search--dropdown--container">
          <li
            className="search--dropdown--item"
            onClick={(e) => {
              setSearchOption({ ...searchOption, option: "title" });
              setIsClicked(false);
              setSelected(e.target.textContent);
            }}
          >
            글 제목
          </li>
          <li
            className="search--dropdown--item"
            onClick={(e) => {
              setSearchOption({ ...searchOption, option: "place" });
              setIsClicked(false);
              setSelected(e.target.textContent);
            }}
          >
            위치
          </li>
        </ul>
      ) : null}
    </div>
  );
};

export default OptionSelector;
