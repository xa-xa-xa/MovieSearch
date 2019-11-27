import React, { useState, useEffect } from 'react';

import axios from 'axios';
import Spinner from '../layout/Spinner/Spinner';

import styles from './details.module.scss';
import DetailsPage from '../pages/details/DetailsPage';

const language = 'en-US';

const Details = props => {
  const { mediaType, id } = props.match.params;

  const initialState = {
    id: null,
    mediaType: '',
    details: {},
    cast: {},
    backdrop_path: ''
  };

  const [media, setMedia] = useState(initialState);
  const history = props.location.pathname;

  const fetchData = (mediaType, id) => {
    try {
      axios
        .get(
          `https://api.themoviedb.org/3/${mediaType}/${id}?api_key=${process.env.REACT_APP_MS_KEY}&language=${language}`
        )
        .then(async res => {
          setMedia(initialState => ({
            ...initialState,
            details: res.data,
            backdrop_path: res.data.backdrop_path,
            id: id,
            mediaType: mediaType
          }));

          if (mediaType !== 'person') {
            axios
              .get(
                `https://api.themoviedb.org/3/${mediaType}/${id}/credits?api_key=${process.env.REACT_APP_MS_KEY}`
              )
              .then(async res => {
                setMedia(media => ({
                  ...media,
                  cast: res.data.cast
                }));
              });
          }
        });
    } catch (err) {
      console.error('! ERROR from .catch() -->', err);
    }
  };

  useEffect(() => {
    fetchData(mediaType, id);
    return () => {
      setMedia(initialState);
    };
    // eslint-disable-next-line
  }, [mediaType, id]);

  // const { details, cast, backdrop_path } = media;

  if (media.details === undefined || Object.keys(media.details).length === 0) {
    return <Spinner />;
  } else {
    return (
      <React.Fragment>
        {media.backdrop_path && (
          <div
            className={styles.backdrop}
            style={{
              backgroundImage: `url(https://image.tmdb.org/t/p/w600_and_h900_bestv2/${media.backdrop_path}`
            }}
          />
        )}
        <div className={styles.details_card}>
          {DetailsPage(mediaType, media.details, media.cast)}
        </div>
      </React.Fragment>
    );
  }
};

export default Details;
