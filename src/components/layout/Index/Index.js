import React, { Fragment } from 'react';
import HomePage from '../../pages/home/HomePage';
import Search from '../../movies/Search';

export default function Index() {
  return (
    <Fragment>
      <Search />
      <HomePage />
    </Fragment>
  );
}
