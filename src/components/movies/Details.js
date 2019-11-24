import React, { Component } from 'react';
import axios from 'axios';
import Spinner from '../layout/Spinner/Spinner';

import styles from './details.module.scss';
import DetailsPage from '../pages/details/DetailsPage';

const language = 'en-US';

export default class Details extends Component {
  state = {
    id: {},
    mediaType: {},
    details: {},
    cast: {}
  };

  fetchData(mediaType, id) {
    axios
      .get(
        `https://api.themoviedb.org/3/${mediaType}/${id}?api_key=${process.env.REACT_APP_MS_KEY}&language=${language}`
      )
      .then(res => {
        this.setState({ details: res.data, id: id, mediaType: mediaType });
        if (mediaType !== 'person') {
          return axios
            .get(
              `https://api.themoviedb.org/3/${mediaType}/${id}/credits?api_key=${process.env.REACT_APP_MS_KEY}`
            )
            .then(res => {
              this.setState({ cast: res.data.cast });
            });
        }
      })
      .catch(err => console.error('! ERROR from .catch() -->', err));
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
    const { details = [], cast = [], mediaType } = this.state;
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
  }
}
