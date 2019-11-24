import React, { Component } from 'react';
import { Consumer } from '../../../context';
import Card from '../../layout/Card/Card';
import Spinner from '../../layout/Spinner/Spinner';
import styles from './homePage.module.scss';

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
              <>
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
              </>
            );
          }
        }}
      </Consumer>
    );
  }
}
