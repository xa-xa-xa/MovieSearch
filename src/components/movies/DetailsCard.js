import React from 'react';
import styles from './detailsCardStyles.module.scss';
import { Link } from 'react-router-dom';
import Spinner from '../layout/Spinner';

const no_image = '/images/no_image.png';

export default function DetailsCard(mediaType, details, cast) {
  // console.log('mediaType: ', mediaType, details);

  const noInfo = 'Sorry, no info available at this time';

  switch (mediaType) {
    /*
     * Details Card A Person
     */
    case 'person':
      console.log(mediaType);

      return (
        <React.Fragment>
          <div className={styles.container}>
            <section className={styles.poster_section}>
              <img
                className={styles.poster}
                src={`https://image.tmdb.org/t/p/w600_and_h900_bestv2/${details.profile_path}`}
                alt='poster'
              />
            </section>
            <section className={styles.details_section}>
              <h2>{details.name}</h2>
              <p className={styles.text}>{details.biography}</p>
              <ul>
                <li>
                  <span className={styles.category}>IMDB-ID:</span>{' '}
                  {details.imdb_id}
                </li>
                <li>
                  <span className={styles.category}>Birthday:</span>{' '}
                  {details.birthday}
                </li>
                <li>
                  <span className={styles.category}>Place of birth:</span>{' '}
                  {details.place_of_birth}
                </li>
                <li>
                  {details.deathday !== null
                    ? `Date of death: ${details.deathday}`
                    : ``}
                </li>
                <li>
                  <span className={styles.category}>
                    {details.homepage ? (
                      <span>
                        Personal Website:{' '}
                        <a
                          target='_blank'
                          rel='noopener noreferrer'
                          href={details.homepage}
                        >
                          {details.homepage}
                        </a>
                      </span>
                    ) : (
                      ''
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
     *TV Details Card for TV Show
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
                  src={`https://image.tmdb.org/t/p/w600_and_h900_bestv2/${details.poster_path}`}
                  alt='poster'
                />
              </section>

              <section className={styles.details_section}>
                <h2>{details.original_name}</h2>
                <p className={styles.text}>{details.overview}</p>
                <ul>
                  <li className='release-date'>
                    <span className={styles.category}>Air time:</span>{' '}
                    {details.first_air_date} -{' '}
                    {details.status === 'Ended'
                      ? `${details.last_air_date} (Ended)`
                      : 'still in production '}
                  </li>
                  <li>
                    <div>
                      <span className={styles.category}>
                        Original language:
                      </span>{' '}
                      {details.original_language.toUpperCase()}
                    </div>
                  </li>
                  <li>
                    <div>
                      <span className={styles.category}>
                        Production country:{' '}
                      </span>
                      {details.origin_country}
                    </div>
                  </li>

                  <li>
                    <div className={styles.companies}>
                      <span className={styles.category}> Networks: </span>
                      {details.networks.map((i, index) =>
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
                        {details.seasons.map((i, index) => {
                          return (
                            <li
                              key={`episode_${index}`}
                              className={styles.season}
                            >
                              season{' '}
                              {details.seasons.length > 1
                                ? i.season_number + 1
                                : '1'}
                              : {i.episode_count} episodes (
                              {i.air_date ? i.air_date.slice(0, 4) : noInfo})
                              {i.season_number === details.seasons.length - 1 ||
                              details.seasons.length === 1
                                ? ` `
                                : `, `}
                            </li>
                          );
                        })}
                      </ul>
                    </div>
                  </li>
                </ul>
              </section>

              <section className={styles.cast}>
                {cast
                  .filter(i => i.order < 8)
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
              </section>
            </div>
          </React.Fragment>
        );
      }
    default:
      /*
       * DEFAULT: Details Card For A Movie
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
                  src={`https://image.tmdb.org/t/p/w600_and_h900_bestv2/${details.poster_path}`}
                  alt='poster'
                />
              </section>
              <section className={styles.details_section}>
                <h2>{details.original_title}</h2>
                <p className={styles.text}>{details.overview}</p>
                <ul>
                  <li>
                    <span className={styles.category}>IMDB-ID:</span>{' '}
                    {details.imdb_id}
                  </li>
                  <li className='release-date'>
                    <span className={styles.category}>Release date:</span>{' '}
                    {details.release_date}
                  </li>
                  <li>
                    <div>
                      <span className={styles.category}>
                        Original language:
                      </span>{' '}
                      {details.original_language}
                    </div>
                  </li>
                  <li>
                    <div>
                      <span className={styles.category}>
                        Production countries:{' '}
                      </span>
                      {details.production_countries.map((i, index) => (
                        <span key={index}>{(index ? ', ' : '') + i.name}</span>
                      ))}
                    </div>
                  </li>
                  <li>
                    <div className={styles.companies}>
                      <span className={styles.category}> Company: </span>
                      {details.production_companies.map((i, index) =>
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
                      )}
                    </div>
                  </li>
                  <li />
                </ul>
              </section>
              <section className={styles.cast}>
                {cast
                  .filter(i => i.order < 8)
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
              </section>
            </div>
          </React.Fragment>
        );
      }
  }
}
