import { useEffect, useRef, useState } from "react";
import DaumPostcode from "react-daum-postcode";

const { kakao } = window;

const PostMap = ({
  place = { x: 127.094664569096, y: 37.5351692767888, place: "2호선 강변역" },
}) => {
  // place => {x, y, place}
  const container = useRef(null);
  const addr = useRef(null);

  useEffect(() => {
    const location = new kakao.maps.LatLng(place.y, place.x);

    const map = new kakao.maps.Map(container.current, {
        center: location,
        level: 5,
      }),
      marker = new kakao.maps.Marker({
        map,
        position: location,
      }),
      infowindow = new kakao.maps.InfoWindow({
        map,
        position: new kakao.maps.LatLng(Number(place.y) + 0.0004, place.x),
        content: `<div class="map--infowindow">${place.place}</div>`,
        removable: true,
      });
  }, []);

  return (
    <div className="post--map--container">
      <div className="post--map" ref={container} />
    </div>
  );
};

export default PostMap;
