import React, { Component } from 'react';
import { Consumer } from '../../context';
import { Redirect } from 'react-router';

import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

import styles from './search.module.scss';

const baseUrl = `https://api.themoviedb.org/3/`;

export default class Search extends Component {
  state = {
    searchQuery: '',
    redirect: false
  };
  search = (dispatch, e) => {
    e.preventDefault();

    axios
      .get(
        `${baseUrl}search/multi?api_key=${process.env.REACT_APP_MS_KEY}&language=en-US&query=${this.state.searchQuery}&page=1&include_adult=false`
      )
      .then(res => {
        if (res.data.results.length === 0) {
          dispatch({
            type: 'SEARCH',
            payload: {
              error: 'SEARCH_NO_MATCH',
              query: this.state.searchQuery
            }
          });
        } else {
          dispatch({
            type: 'SEARCH',
            payload: {
              data: res.data.results,
              query: this.state.searchQuery
            }
          });
        }
      })
      .then(() => {
        this.setState({ redirect: true });
      })
      .catch(err => console.error(err.response));
  };

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  prevProps = this.props; // mounted props

  componentDidUpdate(prevProps) {
    if (prevProps.location !== this.props.location) {
      this.componentDidMount();
    }
  }

  render() {
    const { redirect } = this.state;
    if (redirect === true) {
      return <Redirect to='/' />;
    }
    return (
      <Consumer>
        {value => {
          const { dispatch } = value;
          return (
            <div className='search_button'>
              {' '}
              <form
                className={styles.search_box}
                onSubmit={this.search.bind(this, dispatch)}>
                <input
                  className={styles.search_text}
                  type='text'
                  placeholder='Enter movie, TV show, or name...'
                  name='searchQuery'
                  value={this.state.searchQuery}
                  onChange={this.onChange}
                />
                <button
                  alt='search'
                  type='submit'
                  href='/'
                  className={styles.search_btn}>
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
