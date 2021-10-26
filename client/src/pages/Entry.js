import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router";

const Entry = () => {
  const prevPage = useSelector((state) => state.prevPage);
  const { postId } = useParams();

  console.log(prevPage);
  console.log(window.location.href.split("http://localhost:3000")[1]);
  const getData = () => {
    const Authorization = `Bearer ${localStorage.getItem("token")}`;
    axios
      .get(`http://localhost:8080/entry/${postId}`, {
        headers: { Authorization },
      })
      .then((res) => {
        console.log(res.data);
      });
  };
  useEffect(() => {
    getData();
  }, []);
  return <div>엔트리에옹</div>;
};

export default Entry;
