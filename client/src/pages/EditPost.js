import { useEffect, useState, useRef } from "react";
import { useHistory } from "react-router";
import { useParams } from "react-router";
import { useSelector } from "react-redux";
import AWS from "aws-sdk";
import dotenv from "dotenv";
import axios from "axios";
import EditCompleteModal from "../components/EditPost/EditCompleteModal";
import Error from "./Error";
import EventSelector from "../components/EditPost/EventSelector";
import TypeSelector from "../components/EditPost/TypeSelector";
import EditMap from "../components/EditPost/EditMap";
import NoImage from "../components/CreatePost/NoImage";
dotenv.config();

export default function EditPost() {
  const history = useHistory();
  const { docId } = useParams();
  const [preview, setPreview] = useState([]);
  const [previous, setPrevious] = useState([]);
  const [files, setFiles] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [event, setEvent] = useState(null);
  const [type, setType] = useState(null);
  const fileUpload = useRef(null);
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
    if (imageFiles.length + previous.length > 5) {
      setFiles(imageFiles.slice(0, 5 - previous.length));
    } else {
      setFiles(imageFiles);
    }

    const previewArr = [];
    for (let imageFile of imageFiles) {
      const data = [];
      data.push(imageFile);
      const imageURL = window.URL.createObjectURL(
        new Blob(data, { type: "image" })
      );
      previewArr.push(imageURL);
    }
    if (previewArr.length + previous.length > 5) {
      setPreview(previewArr.slice(0, 5 - previous.length));
    } else {
      setPreview(previewArr);
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
    const EditArr = [...previous, ...pathArr];
    handleEdit(EditArr);
  };

  const handleEdit = (arr) => {
    const { title, place, price, text } = inputValue;
    const token = localStorage.getItem("token");
    axios
      .put(
        `https://server.winner-s-record.link/doc/${docId}`,
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

  const isTournament = type === "tournament";

  useEffect(() => {
    const token = localStorage.getItem("token");
    axios
      .get(`https://server.winner-s-record.link/doc/${docId}`, {
        headers: { authorization: `Bearer ${token}` },
      })
      .then((res) => {
        console.log(res.data.data.type);
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
        <div className="post--background">
          <div className="post--selectors">
            {isTournament ? (
              <div className="post--name-tournament">
                토너먼트 수정 <i class="fa fa-users"></i>
              </div>
            ) : (
              <div className="post--name">
                게시글 수정 <i class="fas fa-pencil-alt"></i>
              </div>
            )}
            <EventSelector setEvent={setEvent} event={event} />
            {isTournament ? null : (
              <TypeSelector setType={setType} type={type} />
            )}
          </div>

          <div className="post--inputcontainer">
            <div className="post--title">
              <div>제목</div>
              <input
                type="title"
                onChange={handleInputValue("title")}
                placeholder="제목을 입력해주세요"
                value={inputValue.title}
              />
            </div>
            {type === "trade" ? (
              <div className="post--price">
                <div>가격</div>
                <input
                  type="price"
                  onChange={handleInputValue("price")}
                  placeholder="가격을 숫자로 입력해주세요"
                  value={inputValue.price}
                />
              </div>
            ) : null}
            <div className="post--text">
              <div>내용</div>
              <textarea
                type="text"
                onChange={handleInputValue("text")}
                placeholder="내용을 입력해주세요"
                value={inputValue.text}
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
                            <i class="fa fa-trash"></i>
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
                            <i class="fa fa-trash"></i>
                          </div>
                        </li>
                      );
                    })
                  : null}
                {preview.length + previous.length ? null : <NoImage />}
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
              <EditMap inputValue={inputValue} setInputValue={setInputValue} />
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
          <EditCompleteModal isModalOpen={isModalOpen} docId={docId} />
        </div>
      )}
    </>
  );
}
