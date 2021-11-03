import React from 'react';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router';

const ChatPost = ({chatData}) => {
  const {img, title, updatedAt, place, docId} = chatData
  const history = useHistory();

  return (
    <div className='chat--container post' onClick={()=>{
      history.push(`/post/${docId}`)
    }}>
      <div className='img--container'>
        <img src={img} alt='' /></div> 
      <div className='content--container'>
        <div className='title'>{title}</div>
        <div className='place'>{place.split('|')[4]}</div>
      </div>
      <div className='time'>{`${new Date(updatedAt).getMonth()+1}-${new Date(
        updatedAt
      ).getDate()} ${new Date(updatedAt).getHours()}:${new Date(
        updatedAt
      ).getMinutes()}`}</div>

    </div>
  );
};

export default ChatPost;