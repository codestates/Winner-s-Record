import { useEffect, useRef, useState } from "react";
import DaumPostcode from "react-daum-postcode";

const { kakao } = window;

const PostMap = () => {
  const container = useRef(null);
  const addr = useRef(null);

  const [coordinateData, setCoordinateData] = useState({});
  const [isOn, setIsOn] = useState(false);

  const options = {
    center: new kakao.maps.LatLng(37.537187, 127.005476),
    level: 5,
  };

  useEffect(() => {
    const location = new kakao.maps.LatLng(coordinateData.y, coordinateData.x);
    let map = new kakao.maps.Map(container.current, {
        center: location,
      }),
      marker = new kakao.maps.Marker({
        map,
        position: location,
      }),
      infowindow = new kakao.maps.InfoWindow({
        map,
        position: new kakao.maps.LatLng(
          Number(coordinateData.y) + 0.0004,
          coordinateData.x
        ),
        content: `<div class="map--infowindow">${coordinateData.place}</div>`,
        removable: true,
      });
  }, [coordinateData]);

  const addrFinder = (data) => {
    const geocoder = new kakao.maps.services.Geocoder();
    addr.current.textContent = data.address;
    console.log("data", data);
    geocoder.addressSearch(data.address, (result, status) => {
      if (status === "OK") {
        const x = result[0].x;
        const y = result[0].y;
        const place = result[0].road_address.address_name;
        setCoordinateData({ y, x, place });
      }
    });
  };

  return (
    <div className="post--map--container">
      <div className="post--map--input--container">
        <div className="post--address" ref={addr}></div>
        <button
          onClick={() => {
            setIsOn(true);
          }}
        >
          주소찾기
        </button>
      </div>
      {isOn ? <DaumPostcode onComplete={addrFinder} /> : null}
      <div className="post--map" ref={container} />
    </div>
  );
};

export default PostMap;
