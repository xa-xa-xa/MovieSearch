import React, { useState, useEffect } from 'react';

import axios from 'axios';
import Spinner from '../layout/Spinner/Spinner';

import styles from './details.module.scss';
import DetailsPage from '../pages/details/DetailsPage';

const language = 'en-US';

const Details = props => {
  const { id, mediaType } = props.match.params;

  let initialState = {
    id: null,
    type: '',
    details: {},
    cast: {},
    backdrop_path: ''
  };
  const [media, setMedia] = useState(initialState);

  const fetchData = async (mediaType, id) => {
    try {
      await axios
        .get(
          `https://api.themoviedb.org/3/${mediaType}/${id}?api_key=${process.env.REACT_APP_MS_KEY}&language=${language}`
        )
        .then(res => {
          setMedia({
            ...initialState,
            id: id,
            type: mediaType,
            details: res.data,
            backdrop_path: res.data.backdrop_path
          });

          if (mediaType !== 'person') {
            axios
              .get(
                `https://api.themoviedb.org/3/${mediaType}/${id}/credits?api_key=${process.env.REACT_APP_MS_KEY}`
              )
              .then(res => {
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
  }, [props.match.params]);

  const { details, cast, backdrop_path, type } = media;

  if (details === undefined || Object.keys(details).length === 0) {
    return <Spinner />;
  } else {
    return (
      <React.Fragment>
        {backdrop_path && (
          <div
            className={styles.backdrop}
            style={{
              backgroundImage: `url(https://image.tmdb.org/t/p/w600_and_h900_bestv2/${media.backdrop_path}`
            }}
          />
        )}
        <div className={styles.details_card}>
          {DetailsPage(type, details, cast)}
        </div>
      </React.Fragment>
    );
  }
};

export default Details;
