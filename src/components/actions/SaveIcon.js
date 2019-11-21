import React, { useState, useEffect } from 'react';
import { faBookmark as farBookmark } from '@fortawesome/free-regular-svg-icons';
import { faBookmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import ls from 'local-storage';

const SaveIcon = props => {
  const { saveId, mediaType } = props;

  const [save, setSave] = useState({
    id: saveId,
    mediaType: mediaType
  });
  const lsSave = `save_${saveId}`;

  const [saveStatus, setSaveStatus] = useState(
    localStorage.hasOwnProperty(lsSave)
  );

  function HandleClick() {
    setSaveStatus(!saveStatus);
    setSave({ id: saveId, mediaType: mediaType });
  }

  function saveDeleteLocalStorage() {
    saveStatus ? ls(lsSave, save) : ls.remove(lsSave);
  }

  useEffect(() => {
    saveDeleteLocalStorage();
    // eslint-disable-next-line
  }, [saveStatus]);

  return (
    <FontAwesomeIcon
      onClick={() => HandleClick()}
      icon={saveStatus ? faBookmark : farBookmark}
      style={{ cursor: 'pointer' }}
    ></FontAwesomeIcon>
  );
};

export default SaveIcon;
