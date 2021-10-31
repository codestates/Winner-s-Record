import { useEffect, useState } from "react";
import { useHistory } from "react-router";
import AWS from "aws-sdk";
import dotenv from "dotenv";
import axios from "axios";
import CreateCompleteModal from "../components/CreateDoc/CreateCompleteModal";

import TypeSelector from "../components/CreateDoc/TypeSelector";
import EventSelector from "../components/CreateDoc/EventSelector";
dotenv.config();

export default function EditDoc() {
  const history = useHistory();
  const [preview, setPreview] = useState([]);
  const [files, setFiles] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [event, setEvent] = useState(null);
  const [type, setType] = useState(null);

  const openModalHandler = () => {
    setIsModalOpen(!isModalOpen);
  };

  const imgOnchange = (e) => {
    const imageFileArr = e.target.files;
    setFiles(imageFileArr);
    const previewArr = [];
    for (let imageFile of imageFileArr) {
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
    place: "",
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
    handleSubmit(pathArr);
  };

  const handleSubmit = (arr) => {
    const { title, place, price, text } = inputValue;
    const token = localStorage.getItem("token");
    axios
      .post(
        "http://localhost:8080/doc",
        { type, title, event, place, price, text, img: arr },
        {
          headers: { authorization: `Bearer ${token}` },
        }
      )
      .then((res) => {
        console.log(res.data);
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
    axios.get();
  }, []);

  return (
    <div>
      <div>
        <EventSelector setEvent={setEvent} />
        <TypeSelector setType={setType} />
        {type === "trade" ? (
          <input
            type="price"
            onChange={handleInputValue("price")}
            placeholder="가격"
          />
        ) : null}
      </div>
      <div>
        <input
          type="title"
          onChange={handleInputValue("title")}
          placeholder="제목"
        />
        <input
          type="text"
          onChange={handleInputValue("text")}
          placeholder="본문"
        />
        <input type="file" multiple="true" onChange={imgOnchange} />
        <div>
          {preview.map((e, index) => {
            return <img key={index} src={e} />;
          })}
        </div>
      </div>

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
      <CreateCompleteModal
        isModalOpen={isModalOpen}
        openModalHandler={openModalHandler}
      />
    </div>
  );
}
