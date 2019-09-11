import React, { useState, useEffect } from 'react';
import { faHeart as farHeart } from '@fortawesome/free-regular-svg-icons';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { useLocalState, LocalContext } from '../services/localStorage';
import ls from 'local-storage';
let LIKES = [];
const LikeIcon = props => {
  const { likeId, mediaType } = props;
  const [like, setLike] = useState({
    id: 0,
    mediaType: ''
  });
  const lsLike = `like_${likeId}`;

  const [likeStatus, setLikeStatus] = useState(
    localStorage.hasOwnProperty(lsLike)
  );
  function handleClick(likeStatus) {
    setLikeStatus(!likeStatus);
    setLike({ id: likeId, mediaType: mediaType });
  }

  // function ToOrFromLocalStorage() {
  //   likeStatus === true && !LIKES.includes(like)
  //     ? LIKES.push(like) // adding to an array
  //     : (LIKES = LIKES.filter(el => el.id !== likeId)); // delete if already in the array
  // }

  function saveDeleteLocalStorage() {
    console.log(like);
    likeStatus ? ls(lsLike, like) : ls.remove(lsLike);
  }

  useEffect(() => {
    saveDeleteLocalStorage();
    // console.log(`LIKES(${LIKES.length})`, LIKES, like);
  }, [likeStatus]);

  return (
    <FontAwesomeIcon
      onClick={() => handleClick(likeStatus)}
      icon={likeStatus ? faHeart : farHeart}
      style={{ cursor: 'pointer' }}
    />
  );
};

export default LikeIcon;
