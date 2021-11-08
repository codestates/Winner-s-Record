import { useState } from "react";

const ImageCarousel = ({ images = [] }) => {
  const [idxImg, setIdxImg] = useState(0);

  return (
    <div className="post--ic--container">
      <div className="image--wrapper">
        <img src={images[idxImg]} alt="" />
        <div
          className="btn left"
          onClick={() => {
            if (idxImg === 0) {
              setIdxImg(images.length - 1);
            } else {
              setIdxImg(idxImg - 1);
            }
          }}
        >
          <i className="fas fa-chevron-left" />
        </div>
        <div
          className="btn right"
          onClick={() => {
            if (idxImg === images.length - 1) {
              setIdxImg(0);
            } else {
              setIdxImg(idxImg + 1);
            }
          }}
        >
          <i className="fas fa-chevron-right" />
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
