import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Spinner from '../layout/Spinner/Spinner';

import styles from './details.module.scss';
import DetailsPage from '../pages/details/DetailsPage';

const language = 'en-US';

const Details = props => {
  const { mediaType, id } = props.match.params;

  const initialState = {
    id: id,
    mediaType: mediaType,
    details: {},
    cast: {}
  };
  const [media, setMedia] = useState(initialState);

  const fetchData = async (mediaType, id) => {
    console.log(mediaType, id);
    await axios
      .get(
        `https://api.themoviedb.org/3/${mediaType}/${id}?api_key=${process.env.REACT_APP_MS_KEY}&language=${language}`
      )
      .then(res => {
        setMedia(initialState => ({
          ...initialState,
          details: res.data
        }));

        if (mediaType !== 'person') {
          return axios
            .get(
              `https://api.themoviedb.org/3/${mediaType}/${id}/credits?api_key=${process.env.REACT_APP_MS_KEY}`
            )
            .then(res => {
              setMedia(initialState => ({
                ...initialState,
                cast: res.data.cast
              }));
            });
        }
      })
      .catch(err => console.error('! ERROR from .catch() -->', err));
  };

  useEffect(() => {
    fetchData(mediaType, id);
    // eslint-disable-next-line
  }, []);

  const { details, cast } = media;

  let backdropImage;
  details.backdrop_path
    ? (backdropImage = {
        backgroundImage: `url(https://image.tmdb.org/t/p/w600_and_h900_bestv2/${details.backdrop_path})`
      })
    : (backdropImage = { backgroundImage: '' });

  if (details === undefined || Object.keys(details).length === 0) {
    return <Spinner />;
  } else {
    return (
      <React.Fragment>
        <div className={styles.backdrop} style={backdropImage} />
        <div className={styles.details_card}>
          {DetailsPage(mediaType, details, cast)}
        </div>
      </React.Fragment>
    );
  }
};

export default Details;
