import React, { useState, useEffect } from 'react';
import { faHeart as farHeart } from '@fortawesome/free-regular-svg-icons';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import ls from 'local-storage';

const LikeIcon = props => {
  const { likeId, mediaType } = props;
  const [like, setLike] = useState({
    id: likeId,
    mediaType: mediaType
  });
  const lsLike = `like_${likeId}`;

  const [likeStatus, setLikeStatus] = useState(
    localStorage.hasOwnProperty(lsLike)
  );
  function handleClick(likeStatus) {
    setLikeStatus(!likeStatus);
    setLike({ id: likeId, mediaType: mediaType });
  }

  function saveDeleteLocalStorage() {
    likeStatus ? ls(lsLike, like) : ls.remove(lsLike);
  }

  useEffect(() => {
    saveDeleteLocalStorage();
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
