import React from 'react';
import { Link } from 'react-router-dom';
import styles from './accordion.module.css';

const Accordion = props => {
  console.log(props);
  return (
    <div className='accordion_section'>
      <button className='accordion'>
        <div>
          {' '}
          {props.content
            .filter(i => i.order < 5)
            .map(i => (
              <li className={styles.profile} key={i.id}>
                <Link to={`/overview/person/${i.id}`} className='details'>
                  <img
                    className={styles.portrait}
                    src={
                      i.profile_path
                        ? `https://image.tmdb.org/t/p/w300/${i.profile_path}`
                        : props.no_image
                    }
                    alt={i.name}
                  />

                  {i.name}
                </Link>
              </li>
            ))}
        </div>
        <span className='chevron left'></span>
      </button>
    </div>
  );
};

export default Accordion;
