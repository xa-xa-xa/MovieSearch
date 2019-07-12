import React, { Component } from 'react';
import { Consumer } from '../../context';

import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

import styles from './searchStyles.module.scss';

const baseUrl = `https://api.themoviedb.org/3/`;

export default class Search extends Component {
  state = {
    movieTitle: ''
  };
  search = (dispatch, e) => {
    e.preventDefault();

    axios
      .get(
        `${baseUrl}search/multi?api_key=${
          process.env.REACT_APP_MS_KEY
        }&language=en-US&query=${
          this.state.movieTitle
        }&page=1&include_adult=false`
      )
      .then(res => {
        dispatch({
          type: 'SEARCH_MOVIE',
          payload: {
            data: res.data.results,
            query: this.state.movieTitle
          }
        });
      })

      .catch(err => console.error(err.response));
  };

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    return (
      <Consumer>
        {value => {
          const { dispatch } = value;
          return (
            <div className='search_button'>
              {' '}
              <form
                className={styles.search_box}
                onSubmit={this.search.bind(this, dispatch)}
              >
                <input
                  className={styles.search_text}
                  type='text'
                  placeholder='please enter movie or tv show...'
                  name='movieTitle'
                  value={this.state.movieTitle}
                  onChange={this.onChange}
                />
                <button
                  alt='search'
                  type='submit'
                  href='/'
                  className={styles.search_btn}
                >
                  <FontAwesomeIcon icon={faSearch} />
                </button>
              </form>
            </div>
          );
        }}
      </Consumer>
    );
  }
}
