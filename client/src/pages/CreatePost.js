import { useState, useRef } from "react";
import { useHistory } from "react-router";
import AWS from "aws-sdk";
import dotenv from "dotenv";
import axios from "axios";
import CreateCompleteModal from "../components/CreatePost/CreateCompleteModal";
import TypeSelector from "../components/CreatePost/TypeSelector";
import EventSelector from "../components/CreatePost/EventSelector";
import ChooseMap from "../components/CreatePost/ChooseMap";
import NoImage from "../components/CreatePost/NoImage";
dotenv.config();

export default function CreatePost() {
  const history = useHistory();
  const [preview, setPreview] = useState([]);
  const [files, setFiles] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [event, setEvent] = useState(null);
  const [type, setType] = useState(null);
  const [docId, setDocId] = useState(null);
  const fileUpload = useRef(null);

  const openModalHandler = () => {
    setIsModalOpen(!isModalOpen);
  };

  const imgOnchange = (e) => {
    const imageFiles = Array.from(e.target.files);
    if (imageFiles.length > 5) {
      setFiles(imageFiles.slice(0, 5));
    } else {
      setFiles(imageFiles);
    }

    if (imageFiles) {
      const previewArr = [];
      for (let imageFile of imageFiles) {
        const data = [];
        data.push(imageFile);
        const imageURL = window.URL.createObjectURL(
          new Blob(data, { type: "image" })
        );
        previewArr.push(imageURL);
      }
      if (previewArr.length > 5) {
        setPreview(previewArr.slice(0, 5));
      } else {
        setPreview(previewArr);
      }
    }
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
    handleSubmit(pathArr);
  };

  const handleSubmit = (arr) => {
    const { title, place, price, text } = inputValue;
    const token = localStorage.getItem("token");
    axios
      .post(
        "https://server.winner-s-record.link/doc",
        { type, title, event, place, price, text, img: arr },
        {
          headers: { authorization: `Bearer ${token}` },
        }
      )
      .then((res) => {
        setDocId(res.data.data.docId);
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

  return (
    <div className="post--background">
      <div className="post--selectors">
        <div className="post--name">
          게시글 작성 <i class="fas fa-pencil-alt"></i>
        </div>
        <EventSelector setEvent={setEvent} />
        <TypeSelector setType={setType} />
      </div>
      <div className="post--inputcontainer">
        <div className="post--title">
          <div>제목</div>
          <input
            type="title"
            onChange={handleInputValue("title")}
            placeholder="제목을 입력해주세요"
          />
        </div>
        {type === "trade" ? (
          <div className="post--price">
            <div>가격</div>
            <input
              className="post--price"
              type="number"
              onChange={handleInputValue("price")}
              placeholder="가격을 숫자로 입력해주세요"
            />
          </div>
        ) : null}
        <div className="post--text">
          <div>내용</div>
          <textarea
            type="text"
            onChange={handleInputValue("text")}
            placeholder="내용을 입력해주세요"
          />
        </div>
        <div className="post--imgcontainer">
          <div>사진</div>
          <input
            className="post--file"
            ref={fileUpload}
            accept="image/*"
            type="file"
            multiple
            onChange={imgOnchange}
          />

          <ul>
            {preview.length ? (
              preview.map((e, index) => {
                return (
                  <li key={index}>
                    <img src={e} alt="preview" />
                    <div
                      className="post--previewdelete"
                      onClick={() => {
                        setPreview(
                          preview.filter((e) => preview.indexOf(e) !== index)
                        );
                        setFiles(
                          files.filter((e) => files.indexOf(e) !== index)
                        );
                      }}
                    >
                      <i class="fa fa-trash"></i>
                    </div>
                  </li>
                );
              })
            ) : (
              <NoImage />
            )}
          </ul>
          <div>사진은 5장까지 업로드할 수 있습니다.</div>
          <button
            className="post--btn"
            onClick={() => fileUpload.current.click()}
          >
            사진 업로드
          </button>
        </div>
        <div className="post--address">
          <div>주소</div>
          <ChooseMap inputValue={inputValue} setInputValue={setInputValue} />
        </div>
      </div>
      <div className="post--btncontainer">
        <button
          className="modal--twobtn"
          onClick={() => {
            history.push("/main");
          }}
        >
          돌아가기
        </button>
        {isValid(type) ? (
          <button
            className="modal--twobtn-ok"
            onClick={() => {
              uploadFiles(files);
            }}
          >
            작성하기
          </button>
        ) : (
          <button className="modal--twobtn"> 작성하기</button>
        )}
      </div>
      <CreateCompleteModal isModalOpen={isModalOpen} docId={docId} />
    </div>
  );
}
