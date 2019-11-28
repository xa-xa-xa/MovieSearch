import React from 'react';
import styles from './navbarStyles.module.scss';
import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <nav className={`${styles.navbar} nav`}>
      <div className={styles.branding}>
        <h1>
          <Link to='/'>Awesome Movie Search </Link>
        </h1>
        <p>
          <Link to='/'>Fast search for any movie, tv show, or etc</Link>
        </p>
      </div>
    </nav>
  );
}
