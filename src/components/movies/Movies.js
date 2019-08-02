import React, { Component } from 'react';
import { Consumer } from '../../context';
import Movie from '../movies/Movie';
import Spinner from '../layout/Spinner';
import styles from './movie.module.scss';

export default class Movies extends Component {
  render() {
    return (
      <Consumer>
        {value => {
          const { query_results, heading, query } = value;
          const searchResult = query.length === 0 ? '' : query;
          if (query_results === undefined || query_results.length === 0) {
            return <Spinner />;
          } else {
            return (
              <React.Fragment>
                <div>
                  <h3 className={styles.header}>
                    {heading}
                    {searchResult}
                  </h3>
                  <div id='' className='cards'>
                    {query_results.map(item => (
                      <Movie key={item.id} Item={item} />
                    ))}
                  </div>
                </div>
              </React.Fragment>
            );
          }
        }}
      </Consumer>
    );
  }
}
