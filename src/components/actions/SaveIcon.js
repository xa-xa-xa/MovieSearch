import React, { useState } from 'react';
import { faBookmark as farBookmark } from '@fortawesome/free-regular-svg-icons';
import { faBookmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const SaveIcon = props => {
  let { status } = props;

  const [saveStatus, setSaveStatus] = useState(status);

  const HandleLikeClick = () => setSaveStatus(!saveStatus);
  return (
    <>
      <FontAwesomeIcon
        onClick={() => HandleLikeClick()}
        icon={saveStatus ? faBookmark : farBookmark}
        style={{ cursor: 'pointer' }}
      ></FontAwesomeIcon>
    </>
  );
};

export default SaveIcon;
