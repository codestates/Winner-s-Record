import { useEffect, useState } from "react";
import { useHistory } from "react-router";
import { useParams } from "react-router";
import { useSelector } from "react-redux";
import AWS from "aws-sdk";
import dotenv from "dotenv";
import axios from "axios";
import EditCompleteModal from "../components/EditDoc/EditCompleteModal";
import Error from "./Error";
import EventSelector from "../components/EditDoc/EventSelector";
import TypeSelector from "../components/EditDoc/TypeSelector";
import EditMap from "../components/EditDoc/EditMap";
dotenv.config();

export default function EditDoc() {
  const history = useHistory();
  const { docId } = useParams();
  const [preview, setPreview] = useState([]);
  const [previous, setPrevious] = useState([]);
  const [files, setFiles] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [event, setEvent] = useState(null);
  const [type, setType] = useState(null);
  const [postInfo, setPostInfo] = useState({
    userData: {
      userId: null,
      nickname: null,
      img: { link: null },
    },
  });
  const userInfo = useSelector((state) => state.userInfo);

  const isMypost = postInfo.userData.userId === userInfo.userId;
  const openModalHandler = () => {
    setIsModalOpen(!isModalOpen);
  };

  const imgOnchange = (e) => {
    const imageFiles = Array.from(e.target.files);
    setFiles(imageFiles);
    const previewArr = [];
    for (let imageFile of imageFiles) {
      const data = [];
      data.push(imageFile);
      const imageURL = window.URL.createObjectURL(
        new Blob(data, { type: "image" })
      );
      previewArr.push(imageURL);
    }
    setPreview(previewArr);
  };

  const [inputValue, setInputValue] = useState({
    title: "",
    place:
      "37.5161996814031|127.075939572603|서울 송파구 올림픽로 25|서울종합운동장|서울 송파구 잠실동",
    price: "",
    text: "",
    img: [],
  });

  const handleInputValue = (key) => (e) => {
    setInputValue({ ...inputValue, [key]: e.target.value });
  };

  AWS.config.update({
    accessKeyId: process.env.REACT_APP_ACCESS_KEY,
    secretAccessKey: process.env.REACT_APP_SECRET_ACCESS_KEY,
  });

  const myBucket = new AWS.S3({
    params: { Bucket: process.env.REACT_APP_S3_BUCKET },
    region: process.env.REACT_APP_REGION,
  });

  const uploadFiles = async (fileArr) => {
    const pathArr = [];
    for (let file of fileArr) {
      const params = {
        ACL: "public-read",
        Body: file,
        Bucket: process.env.REACT_APP_S3_BUCKET,
        Key: file.name,
        ContentType: "image",
      };
      await myBucket
        .putObject(params)
        .promise()
        .then((res) => {
          const path = `${process.env.REACT_APP_BUCKET_URL}${res.$response.request.httpRequest.path}`;
          pathArr.push(path);
        });
    }
    const EditArr = [...previous, ...pathArr];
    handleEdit(EditArr);
  };

  const handleEdit = (arr) => {
    const { title, place, price, text } = inputValue;
    const token = localStorage.getItem("token");
    axios
      .put(
        `http://localhost:8080/doc/${docId}`,
        { type, title, event, place, price, text, img: arr },
        {
          headers: { authorization: `Bearer ${token}` },
        }
      )
      .then((res) => {
        openModalHandler();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const isValid = (type) => {
    if (type === "match")
      return event && type && inputValue.title && inputValue.text;
    if (type === "trade")
      return (
        event && type && inputValue.title && inputValue.text && inputValue.price
      );
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    axios
      .get(`http://localhost:8080/doc/${docId}`, {
        headers: { authorization: `Bearer ${token}` },
      })
      .then((res) => {
        console.log(res.data.data);
        setPostInfo(res.data.data);
        const { type, title, event, place, price, text, img } = res.data.data;
        setPrevious(img);
        setEvent(event);
        setType(type);
        setInputValue({ title, place, price, text });
      })
      .catch((err) => {
        console.log(err);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {!isMypost ? (
        <Error />
      ) : (
        <div>
          <div>
            <EventSelector setEvent={setEvent} event={event} />
            <TypeSelector setType={setType} type={type} />
            {type === "trade" ? (
              <input
                type="price"
                onChange={handleInputValue("price")}
                placeholder="가격"
                value={inputValue.price}
              />
            ) : null}
          </div>
          <div>
            <input
              type="title"
              onChange={handleInputValue("title")}
              placeholder="제목"
              value={inputValue.title}
            />
            <input
              type="text"
              onChange={handleInputValue("text")}
              placeholder="본문"
              value={inputValue.text}
            />
            <input type="file" multiple onChange={imgOnchange} />
            <ul>
              {previous.length
                ? previous.map((e, index) => {
                    return (
                      <li key={index}>
                        <img src={e} alt="previous" />
                        <div
                          onClick={() => {
                            setPrevious(
                              previous.filter(
                                (e) => previous.indexOf(e) !== index
                              )
                            );
                          }}
                        >
                          삭제
                        </div>
                      </li>
                    );
                  })
                : null}
              {preview.length
                ? preview.map((e, index) => {
                    return (
                      <li key={index}>
                        <img src={e} alt="preview" />
                        <div
                          onClick={() => {
                            setPreview(
                              preview.filter(
                                (e) => preview.indexOf(e) !== index
                              )
                            );
                            setFiles(
                              files.filter((e) => files.indexOf(e) !== index)
                            );
                          }}
                        >
                          삭제
                        </div>
                      </li>
                    );
                  })
                : null}
              {/* {previous.length && preview.length ? null : (
            <div>미리보기가 없습니다.</div>
          )} */}
            </ul>
          </div>
          <EditMap inputValue={inputValue} setInputValue={setInputValue} />
          {/* 지도 */}
          <button
            onClick={() => {
              history.push("/main");
            }}
          >
            돌아가기
          </button>
          {isValid(type) ? (
            <button
              style={{ color: "green" }}
              onClick={() => {
                uploadFiles(files);
              }}
            >
              작성하기
            </button>
          ) : (
            <button> 작성하기</button>
          )}
          <EditCompleteModal isModalOpen={isModalOpen} docId={docId} />
        </div>
      )}
    </>
  );
}
