import React from 'react';
import styles from './detailsPage.module.scss';
import { Link } from 'react-router-dom';
import Spinner from '../../layout/Spinner/Spinner';

const no_image = '/images/no_image.png';

export default function DetailsCard(mediaType, details, cast) {
  const noInfo = ` Sorry, no info available at this time`;
  const {
    name,
    biography,
    overview,
    place_of_birth,
    profile_path,
    imdb_id,
    birthday,
    deathday,
    homepage,
    original_name,
    first_air_date,
    status,
    last_air_date,
    original_language,
    original_title,
    release_date,
    origin_country,
    poster_path,
    production_countries,
    production_companies,
    networks,
    seasons
  } = details;

  switch (mediaType) {
    /*
     * Details Card for A Person
     */
    case 'person':
      return (
        <React.Fragment>
          <div className={styles.container}>
            <section className={styles.poster_section}>
              <img
                className={styles.poster}
                src={
                  profile_path
                    ? `https://image.tmdb.org/t/p/w600_and_h900_bestv2/${profile_path}`
                    : no_image
                }
                alt='poster'
              />
            </section>
            <section className={styles.details_section}>
              <h2>{name}</h2>
              <p className={styles.text}>{biography}</p>
              <ul>
                <li>
                  <span className={styles.category}>IMDB-ID:</span>{' '}
                  {imdb_id ? imdb_id : noInfo}
                </li>
                <li>
                  <span className={styles.category}>Birthday:</span>{' '}
                  {birthday ? birthday : noInfo}
                </li>
                <li>
                  <span className={styles.category}>Place of birth:</span>{' '}
                  {place_of_birth ? place_of_birth : noInfo}
                </li>
                <li>{deathday !== null && `Date of death: ${deathday}`}</li>
                <li>
                  <span className={styles.category}>
                    {homepage && (
                      <span>
                        Personal Website:{' '}
                        <a
                          target='_blank'
                          rel='noopener noreferrer'
                          href={homepage}
                        >
                          {homepage}
                        </a>
                      </span>
                    )}
                  </span>
                </li>
                <li />
              </ul>
            </section>
          </div>
        </React.Fragment>
      );

    /*
     *Details Card for TV Show
     */
    case 'tv':
      if (Object.keys(cast).length === 0 || cast === undefined) {
        return <Spinner />;
      } else {
        return (
          <React.Fragment>
            <div className={styles.container}>
              <section className={styles.poster_section}>
                <img
                  className={styles.poster}
                  src={`https://image.tmdb.org/t/p/w600_and_h900_bestv2/${poster_path}`}
                  alt='poster'
                />
              </section>

              <section className={styles.details_section}>
                <h2>{original_name}</h2>
                <p className={styles.text}>{overview}</p>
                <ul>
                  <li className='release-date'>
                    <span className={styles.category}>Air time:</span>{' '}
                    {first_air_date} -{' '}
                    {status === 'Ended'
                      ? `${last_air_date} (Ended)`
                      : 'still in production '}
                  </li>
                  <li>
                    <div>
                      <span className={styles.category}>
                        Original language:
                      </span>{' '}
                      {original_language.toUpperCase()}
                    </div>
                  </li>
                  <li>
                    <div>
                      <span className={styles.category}>
                        Production country:{' '}
                      </span>
                      {origin_country}
                    </div>
                  </li>

                  <li>
                    <div className={styles.companies}>
                      <span className={styles.category}> Networks: </span>
                      {networks.map((i, index) =>
                        i.logo_path === null ? (
                          <span key={index}>
                            {(index ? ', ' : '') + i.name}
                          </span>
                        ) : (
                          <img
                            className={styles.company_logo}
                            key={index}
                            src={`https://image.tmdb.org/t/p/w300/${i.logo_path}`}
                            alt={i.name}
                          />
                        )
                      )}
                    </div>
                  </li>
                  <li>
                    <div>
                      {' '}
                      <ul className={styles.category}>
                        Seasons:{' '}
                        {seasons.map((i, index) => {
                          return (
                            <li
                              key={`episode_${index}`}
                              className={styles.season}
                            >
                              season{' '}
                              {seasons.length > 1 ? i.season_number + 1 : '1'}:{' '}
                              {i.episode_count} episodes (
                              {i.air_date ? i.air_date.slice(0, 4) : noInfo})
                              {i.season_number === seasons.length - 1 ||
                              seasons.length === 1
                                ? ` `
                                : `, `}
                            </li>
                          );
                        })}
                      </ul>
                    </div>
                  </li>
                  <li className={styles.cast}>
                    {cast
                      .filter(i => i.order < 10)
                      .map(i => (
                        <li className={styles.profile} key={i.id}>
                          <Link
                            to={`/overview/person/${i.id}`}
                            className='details'
                          >
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
                  </li>
                </ul>
              </section>
            </div>
          </React.Fragment>
        );
      }
    default:
      /*
       * DEFAULT CASE: Details Card For A Movie
       */
      if (Object.keys(cast).length === 0 || cast === undefined) {
        return <Spinner />;
      } else {
        return (
          <React.Fragment>
            <div className={styles.container}>
              <section className={styles.poster_section}>
                <img
                  className={styles.poster}
                  src={`https://image.tmdb.org/t/p/w600_and_h900_bestv2/${poster_path}`}
                  alt='poster'
                />
              </section>
              <section className={styles.details_section}>
                <h2>{original_title}</h2>
                <p className={styles.text}>{overview}</p>
                <ul>
                  <li>
                    <span className={styles.category}>IMDB-ID:</span> {imdb_id}
                  </li>
                  <li className='release-date'>
                    <span className={styles.category}>Release date:</span>{' '}
                    {release_date}
                  </li>
                  <li>
                    <div>
                      <span className={styles.category}>
                        Original language:
                      </span>{' '}
                      {original_language.toUpperCase()}
                    </div>
                  </li>
                  <li>
                    <div>
                      <span className={styles.category}>
                        Production countries:{' '}
                      </span>
                      {production_countries.map((i, index) => (
                        <span key={index}>{(index ? ', ' : '') + i.name}</span>
                      ))}
                    </div>
                  </li>
                  <li>
                    <div className={styles.companies}>
                      <span className={styles.category}>Company:</span>{' '}
                      {production_companies.length
                        ? production_companies.map((i, index) =>
                            i.logo_path === null ? (
                              ''
                            ) : (
                              <img
                                className={styles.company_logo}
                                key={index}
                                src={`https://image.tmdb.org/t/p/w300/${i.logo_path}`}
                                alt={i.name}
                              />
                            )
                          )
                        : noInfo}
                    </div>
                  </li>
                  <li className={styles.category}>Cast:</li>
                  <li className={styles.cast}>
                    {cast
                      .filter(i => i.order < 10)
                      .map(i => (
                        <li className={styles.profile} key={i.id}>
                          <Link
                            to={`/overview/person/${i.id}`}
                            className='details'
                          >
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
                  </li>
                </ul>
              </section>
            </div>
          </React.Fragment>
        );
      }
  }
}
