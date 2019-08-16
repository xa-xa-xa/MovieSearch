import React, { Component } from 'react';
import axios from 'axios';
import Spinner from '../layout/Spinner';

import styles from './detailsPageStyles.module.scss';
import DetailsCard from './DetailsCard';

const language = 'en-US';

export default class DetailsPage extends Component {
  state = {
    details: {},
    cast: {},
    ID: {},
    MediaType: {}
  };
  prevId = '';
  prevType = '';

  fetchData(mediaType, id) {
    axios
      .get(
        `https://api.themoviedb.org/3/${mediaType}/${id}?api_key=${
          process.env.REACT_APP_MS_KEY
        }&language=${language}`
      )
      .then(res => {
        this.setState({ details: res.data, ID: id, MediaType: mediaType });
        return axios.get(
          `https://api.themoviedb.org/3/${mediaType}/${id}/credits?api_key=${
            process.env.REACT_APP_MS_KEY
          }`
        );
      })
      .then(res => {
        this.setState({ cast: res.data.cast });
      })
      .catch(err => console.log('ERROR from .catch():', err));
  }

  async componentDidMount() {
    const { mediaType, id } = this.props.match.params;
    this.fetchData(mediaType, id);
  }

  prevProps = this.props; // mounted props

  componentDidUpdate(prevProps) {
    if (prevProps.location !== this.props.location) {
      this.componentDidMount();
    }
  }

  render() {
    const { details = [], cast = [], MediaType } = this.state;
    let backdropImage;
    details.backdrop_path
      ? (backdropImage = {
          backgroundImage: `url(https://image.tmdb.org/t/p/w600_and_h900_bestv2/${
            details.backdrop_path
          })`
        })
      : (backdropImage = { backgroundImage: '' });

    if (
      details === undefined ||
      Object.keys(details).length === 0 ||
      cast === undefined ||
      Object.keys(cast).length === 0
    ) {
      return <Spinner />;
    } else {
      return (
        <React.Fragment>
          <div className={styles.backdrop} style={backdropImage} />
          <div className={styles.details_card}>
            {DetailsCard(MediaType, details, cast)}
          </div>
        </React.Fragment>
      );
    }
  }
}
