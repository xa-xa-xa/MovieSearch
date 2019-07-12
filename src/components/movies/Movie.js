import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faFilm,
  faTv,
  faStar,
  faCalendarAlt
} from '@fortawesome/free-solid-svg-icons';
import styles from './movie.module.scss';

// import styles from "./movie.module.scss";

export default function Movie(props) {
  const { Item } = props;
  let errors = {
    overview: Item.overview
      ? short(Item.overview, 130)
      : 'Sorry, at this time no description available...',
    poster: !Item.poster_path
      ? '/images/poster_not_available.png'
      : `https://image.tmdb.org/t/p/w500/${Item.poster_path}`,
    portrait: Item.profile_path
      ? `https://image.tmdb.org/t/p/w500/${Item.profile_path}`
      : '/images/poster_not_available.png'
  };

  let item = {};

  function setItem(Item) {
    if (Item.media_type) {
      switch (Item.media_type) {
        case 'movie':
          item.type = 'movie';
          item.title = Item.original_title;
          item.overview = errors.overview;
          item.released = `release date: ${Item.release_date}`;
          item.video = Item.video;
          item.poster = errors.poster;
          item.backdrop = `https://image.tmdb.org/t/p/w500/${
            Item.backdrop_path
          }`;
          item.icon = faFilm;
          break;

        case 'tv':
          item.type = 'tv';
          item.title = Item.original_name;
          item.overview = errors.overview;
          item.released = `first air date: ${Item.first_air_date}`;
          item.icon = faTv;
          item.poster = errors.poster;

          break;

        case 'person':
          item.type = 'person';
          item.title = Item.name;
          if (Item.kno)
            item.overview = `Known for: ${Item.known_for.map(
              i => `
            \n ${i.original_title || i.original_name} (${i.release_date})`
            )}`;
          item.portrait = errors.portrait;
          item.icon = faStar;
          break;

        default:
      }
    } else {
      item.title = Item.original_title;
      item.type = 'movie';
      item.overview = errors.overview;
      item.poster = errors.poster;
      item.released = `release date: ${Item.release_date}`;
      item.icon = faCalendarAlt;
    }
  }
  setItem(Item);
  const { title, released, icon, overview, poster, portrait, type } = item;

  return (
    <article className='card'>
      <div className='card-content'>
        <picture>
          <img className='thumbnail' src={poster || portrait} alt={title} />
        </picture>
        <h3 className='movie-title'>{` ${title}`}</h3>

        <h6 className='release-date'>
          <FontAwesomeIcon icon={icon} /> {released}
        </h6>
        <p className={styles.card_text}>{overview}</p>
        <Link to={`/overview/${type}/${Item.id}`} className='details'>
          More details...
        </Link>
      </div>
    </article>
  );
}

function short(string, maxLen) {
  let shorten = string.substring(0, maxLen);
  return /^\S/.test(string.substring(maxLen))
    ? shorten.replace(/\s+\S*$/, '...')
    : shorten;
}
