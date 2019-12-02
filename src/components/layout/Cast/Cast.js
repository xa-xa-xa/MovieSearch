import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import styles from './cast.module.scss';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons';

const no_image = '/images/no_image-4.png';

const Cast = ({ cast }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const castNumberToShow = isExpanded ? cast.length : 10;

  if (cast === undefined || !cast.length) {
    return <span>Sorry, no info available yet... </span>;
  } else {
    return (
      <ul className={styles.cast}>
        {cast
          .filter(i => i.order < castNumberToShow)
          .map(i => (
            <li className={styles.profile} key={i.id}>
              <Link to={`/overview/person/${i.id}`} className='details'>
                <img
                  className={styles.portrait}
                  src={
                    i.profile_path
                      ? `https://image.tmdb.org/t/p/w300/${i.profile_path}`
                      : no_image
                  }
                  alt={i.name}
                />

                {i.name}
              </Link>
            </li>
          ))}
        <div className={styles.cast_expand}>
          <FontAwesomeIcon
            onClick={() => setIsExpanded(!isExpanded)}
            className={styles.chevron_icon}
            icon={isExpanded ? faChevronUp : faChevronDown}></FontAwesomeIcon>
        </div>
      </ul>
    );
  }
};

export default Cast;
