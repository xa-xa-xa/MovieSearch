import React, { useState, Fragment } from 'react';
import { Link } from 'react-router-dom';

import { CSSTransition, TransitionGroup } from 'react-transition-group';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons';
import styles from './cast.module.scss';

const no_image = '/images/no_image-4.png';

const Cast = ({ cast }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const castNumberToShow = isExpanded ? 21 : 6;

  if (cast === undefined || !cast.length) {
    return <span>Sorry, no info available yet... </span>;
  } else {
    const items = cast
      .filter(i => i.order < castNumberToShow)
      .map((item, idx) => (
        <CSSTransition key={idx} classNames='item' timeout={100}>
          <div className={styles.profile} key={idx}>
            <Link to={`/overview/person/${item.id}`} className='details'>
              <img
                className={styles.portrait}
                src={
                  item.profile_path
                    ? `https://image.tmdb.org/t/p/w300/${item.profile_path}`
                    : no_image
                }
                alt={item.name}
              />
              {item.name}
            </Link>
          </div>
        </CSSTransition>
      ));

    // View
    return (
      <Fragment>
        <TransitionGroup className={styles.cast}>{items}</TransitionGroup>

        <div className={styles.cast_expand}>
          <FontAwesomeIcon
            onClick={() => setIsExpanded(!isExpanded)}
            className={styles.chevron_icon}
            icon={isExpanded ? faChevronUp : faChevronDown}
          />
        </div>
      </Fragment>
    );
  }
};
export default Cast;
