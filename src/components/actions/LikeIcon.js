import React, { useState, useEffect } from 'react';
import { faHeart as farHeart } from '@fortawesome/free-regular-svg-icons';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useLocalState, LocalContext } from '../services/localStorage';

let LIKES = [];
const LikeIcon = props => {
  const { likeId, likeType } = props;
  // let likes = [];
  const [like, setLike] = useState({
    id: 0,
    type: '',
    status: false
  });

  function addLikeToLocalStorage(likeStatus) {
    if (likeStatus) {
      if (like.id instanceof LIKES) {
        console.log('Already in LIKES!');
      } else {
        LIKES.push(like);
      }
    }
  }

  function handleStatusChange(likeStatus) {
    setLike({ id: likeId, likeType: likeType, status: !likeStatus });
  }

  useEffect(() => {
    addLikeToLocalStorage(like.status);
    console.log(`LIKES(${LIKES.length})`, LIKES);
  }, [like.status]);

  return (
    <LocalContext.Provider value={[like, setLike]}>
      <FontAwesomeIcon
        onClick={() => handleStatusChange(like.status)}
        icon={like.status ? faHeart : farHeart}
        style={{ cursor: 'pointer' }}
      />
    </LocalContext.Provider>
  );
};

export default LikeIcon;
