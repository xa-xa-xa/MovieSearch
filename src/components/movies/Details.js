import React, { Component } from 'react';
import axios from 'axios';
import Spinner from '../layout/Spinner';
import { Link } from 'react-router-dom';

import styles from './detailsStyles.module.scss';
import DetailsCard from './DetailsCard';

const language = 'en-US';

export default class Details extends Component {
  state = {
    details: {},
    cast: {}
  };

  async componentDidMount() {
    const { mediaType, id } = this.props.match.params;

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
      .catch(err => console.log(err));
  }

  render() {
    const { details, cast } = this.state;
    const backdropImage = {
      backgroundImage:
        'url(https://image.tmdb.org/t/p/w600_and_h900_bestv2/' +
        details.backdrop_path +
        ')'
    };

    if (
      details === undefined ||
      Object.keys(details).length === 0 ||
      cast === undefined ||
      Object.keys(cast).length === 0
    ) {
      return <Spinner />;
    } else {
      // console.info('this.state:', this.state);

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
