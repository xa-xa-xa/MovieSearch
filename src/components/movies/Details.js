import React, { Component } from 'react';
import axios from 'axios';
import Spinner from '../layout/Spinner';

import styles from './detailsStyles.module.scss';
import DetailsCard from './DetailsCard';

const language = 'en-US';

export default class Details extends Component {
  state = {
    details: {},
    cast: {}
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
        this.setState({ details: res.data });
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

  prevProps = this.props.location;

  componentDidUpdate(prevProps) {
    if (this.props.location !== prevProps.location) {
      this.setState({
        id: this.props.match.params.id,
        mediaType: this.props.match.params.mediaType
      });
      this.componentDidMount();
    }
  }

  render() {
    const { details = [], cast = [] } = this.state;
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
            {DetailsCard(this.props.match.params.mediaType, details, cast)}
          </div>
        </React.Fragment>
      );
    }
  }
}
