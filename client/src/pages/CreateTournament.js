import { useState, useRef } from "react";
import { useHistory } from "react-router";
import S3 from "react-aws-s3";
import { v4 } from "uuid";
import dotenv from "dotenv";
import axios from "axios";
import CreateCompleteModal from "../components/CreatePost/CreateCompleteModal";
import EventSelector from "../components/CreatePost/EventSelector";
import ChooseMap from "../components/CreatePost/ChooseMap";
import NoImage from "../components/CreatePost/NoImage";
dotenv.config();

export default function CreateDoc() {
  const history = useHistory();
  const [preview, setPreview] = useState([]);
  const [files, setFiles] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [event, setEvent] = useState(null);
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

  const config = {
    bucketName: process.env.REACT_APP_S3_BUCKET,
    region: process.env.REACT_APP_REGION,
    accessKeyId: process.env.REACT_APP_ACCESS_KEY,
    secretAccessKey: process.env.REACT_APP_SECRET_ACCESS_KEY,
  };

  const ReactS3Client = new S3(config);
  const newFileName = v4();

  const uploadFiles = async (fileArr) => {
    const pathArr = [];
    for (let file of fileArr) {
      await ReactS3Client.uploadFile(file, newFileName)
        .then((data) => {
          pathArr.push(data.location);
        })
        .catch((err) => console.error(err));
    }
    handleSubmit(pathArr);
  };

  const handleSubmit = (arr) => {
    const { title, place, text } = inputValue;
    const token = localStorage.getItem("token");
    axios
      .post(
        "https://server.winner-s-record.link/doc",
        { type: "tournament", title, event, place, text, img: arr },
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

  const isValid = event && inputValue.title && inputValue.text;

  return (
    <div className="post--background">
      <div className="post--selectors">
        <div className="post--name-tournament">
          토너먼트 생성 <i class="fa fa-users"></i>
        </div>
        <EventSelector setEvent={setEvent} />
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
            type="file"
            ref={fileUpload}
            accept="image/*"
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
        {isValid ? (
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
