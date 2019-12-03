import React, { Component, Fragment } from 'react';
import { Consumer } from '../../../context';
import Card from '../../layout/Card/Card';
import Spinner from '../../layout/Spinner/Spinner';
import styles from './homePage.module.scss';

export default class Movies extends Component {
  render() {
    return (
      <Consumer>
        {value => {
          const { query_results, heading, query, error } = value;
          const searchResult = query.length ? query : error;

          if (query_results === undefined || query_results.length === 0) {
            if (error === 'SEARCH_NO_MATCH') {
              return (
                <Fragment>
                  <h3 className={styles.error_msg}>
                    Sorry, nothing been found for{' '}
                    <span className={styles.query}>'{query}'</span>, please
                    check you spelling or try to search for something else...
                  </h3>
                </Fragment>
              );
            }
            return <Spinner />;
          } else {
            return (
              <Fragment>
                <div>
                  <h3 className={styles.header}>
                    {heading}
                    <span className={styles.query}>{searchResult}</span>
                  </h3>
                  <div className={`cards ${styles.content}`}>
                    {query_results.map(item => (
                      <Card key={item.id} Item={item} />
                    ))}
                  </div>
                </div>
              </Fragment>
            );
          }
        }}
      </Consumer>
    );
  }
}
