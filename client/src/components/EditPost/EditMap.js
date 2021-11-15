import { useEffect, useRef, useState } from "react";
import Postcode from "react-daum-postcode";

const { kakao } = window;

const EditMap = ({ inputValue, setInputValue }) => {
  const container = useRef(null);
  const addr = useRef(null);

  const [isOn, setIsOn] = useState(false);

  useEffect(() => {
    let data = inputValue.place.split("|");
    const location = new kakao.maps.LatLng(data[0], data[1]);
    let map = new kakao.maps.Map(container.current, {
        center: location,
      }),
      marker = new kakao.maps.Marker({
        map,
        position: location,
      }),
      infowindow = new kakao.maps.CustomOverlay({
        map,
        position: new kakao.maps.LatLng(data[0], data[1]),
        content: `<div class="map--infowindow"><span>${
          data[3] === "null" ? data[2] : data[3]
        }</span></div>`,
        yAnchor: 1,
      });
  }, [inputValue.place]);

  // '위도|경도|주소|빌딩이름|리스트에서 보일 주소'
  const addrFinder = (data) => {
    const geocoder = new kakao.maps.services.Geocoder();
    addr.current.textContent = data.address;
    console.log("data", data);
    geocoder.addressSearch(data.address, (result, status) => {
      if (status === "OK") {
        console.log(result[0]);
        const lat = result[0].y;
        const lng = result[0].x;
        const place = result[0].road_address.address_name;
        const building = result[0].road_address.building_name || "null";
        const region = `${result[0].road_address.region_1depth_name} ${result[0].road_address.region_2depth_name} ${result[0].road_address.region_3depth_name}`;
        setInputValue({
          ...inputValue,
          place: `${lat}|${lng}|${place}|${building}|${region}`,
        });
      }
    });
  };

  return (
    <div className="post--map--container">
      <div className="post--map--input--container">
        <div className="post--map--address">
          <span ref={addr}>
            {inputValue.place.split("|")[3] !== "null"
              ? inputValue.place.split("|")[3]
              : inputValue.place.split("|")[2]}
          </span>
        </div>
        <div
          className="post--map--btn"
          onClick={() => {
            setIsOn(true);
          }}
        >
          <i className="fas fa-search"></i>
        </div>
      </div>
      {isOn ? (
        <div
          className="modal--backdrop"
          onClick={() => {
            setIsOn(false);
          }}
        >
          <div className="modal--view postcode">
            <Postcode
              onComplete={(data) => {
                addrFinder(data);
                setIsOn(false);
              }}
              className="post--map--postcode"
            />
          </div>
        </div>
      ) : null}

      <div className="post--map" ref={container} />
    </div>
  );
};

export default EditMap;
