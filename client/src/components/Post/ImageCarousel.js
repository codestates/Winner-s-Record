import { useState } from "react";

const ImageCarousel = ({ images = [] }) => {
  const [idxImg, setIdxImg] = useState(0);

  return (
    <div className="post--ic--container">
      <div className="post--ic--image--wrapper">
        <img src={images[idxImg]} alt="" />
        <div
          onClick={() => {
            if (idxImg === 0) {
              setIdxImg(images.length - 1);
            } else {
              setIdxImg(idxImg - 1);
            }
          }}
        >
          prev
        </div>
        <div
          onClick={() => {
            if (idxImg === images.length - 1) {
              setIdxImg(0);
            } else {
              setIdxImg(idxImg + 1);
            }
          }}
        >
          next
        </div>
      </div>

      <ul className="post--ic--image--indicator">
        {images.map((e, idx) => {
          return (
            <li
              key={idx}
              className={`${idxImg === idx ? "displaying" : ""}`}
            ></li>
          );
        })}
      </ul>
    </div>
  );
};

export default ImageCarousel;
