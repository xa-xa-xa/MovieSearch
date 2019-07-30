import React from 'react';
import styles from './detailsCardStyles.module.scss';
import { Link } from 'react-router-dom';

export default function DetailsCard(mediaType, details, cast) {
  console.log('cast: ', cast);
  // console.log('mediaType: ', mediaType, details);

  switch (mediaType) {
    // Persons details card
    case 'person':
      // console.log(details);
      return (
        <React.Fragment>
          <div className={styles.container}>
            <div className={styles.details_section}>
              <h2>{details.original_name}</h2>
              <p className={`card-text ${styles.text}`}>{details.biography}</p>
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
                        Personal Website:
                        <a href={details.homepage}>{details.homepage}</a>
                      </span>
                    ) : (
                      ''
                    )}
                  </span>
                </li>
                <li />
              </ul>
            </div>
            <div className={styles.poster_section}>
              <img
                className={styles.poster}
                src={`https://image.tmdb.org/t/p/w600_and_h900_bestv2/${
                  details.profile_path
                }`}
                alt='poster'
              />
            </div>
          </div>
        </React.Fragment>
      );

    case 'tv':
      return (
        <React.Fragment>
          <div className={styles.container}>
            <div className={styles.details_section}>
              <h2>{details.original_name}</h2>
              <p className={`card-text ${styles.text}`}>{details.overview}</p>
              <ul>
                <li>
                  <span className={styles.category}>Seasons:</span>{' '}
                  <ul className={styles.seasons}>
                    {details.seasons.map((i, index) => {
                      return (
                        <li key={`episode_${index}`} className={styles.season}>
                          {index ? ', ' : ''}season {i.season_number + 1}:{' '}
                          {i.episode_count} episodes ({i.air_date.slice(0, 4)}){' '}
                        </li>
                      );
                    })}
                  </ul>
                </li>
                <li className='release-date'>
                  <span className={styles.category}>Air time:</span>{' '}
                  {details.first_air_date} -{' '}
                  {details.status === 'Ended'
                    ? `${details.last_air_date} (Ended)`
                    : 'still in production '}
                </li>
                <li>
                  <div>
                    <span className={styles.category}>Original language:</span>{' '}
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
                <li />
                <li>
                  <div className={styles.companies}>
                    <span className={styles.category}> Networks: </span>
                    {details.networks.map((i, index) =>
                      i.logo_path === null ? (
                        <span key={index}>{(index ? ', ' : '') + i.name}</span>
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
                  <ul className={styles.cast}>
                    <span className={styles.category}>Cast:</span>
                    {cast
                      .filter(i => i.order < 8)
                      .map(i => (
                        <li className={styles.profile} key={i.id}>
                          <img
                            className={styles.portrait}
                            src={`https://image.tmdb.org/t/p/w300/${
                              i.profile_path
                            }`}
                            alt={i.name}
                          />
                          <a className={styles.name} href='/'>
                            {i.name}
                          </a>
                        </li>
                      ))}
                  </ul>
                </li>
              </ul>
            </div>
            <div className={styles.poster_section}>
              <img
                className={styles.poster}
                src={`https://image.tmdb.org/t/p/w600_and_h900_bestv2/${
                  details.poster_path
                }`}
                alt='poster'
              />
            </div>
          </div>
        </React.Fragment>
      );
    default:
      // Movie type
      return (
        <React.Fragment>
          <div className={styles.container}>
            <div className={styles.details_section}>
              <h2>{details.original_title}</h2>
              <p>{details.overview}</p>
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
                    <span className={styles.category}>Original language:</span>{' '}
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
                        <span key={index}>{(index ? ', ' : '') + i.name}</span>
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
            </div>
            <div className={styles.poster_section}>
              <img
                className={styles.poster}
                src={`https://image.tmdb.org/t/p/w600_and_h900_bestv2/${
                  details.poster_path
                }`}
                alt='poster'
              />
            </div>
            <div className={styles.cast}>
              {cast
                .filter(i => i.order < 8)
                .map(i => (
                  <li className={styles.profile} key={i.id}>
                    <Link to={`/overview/person/${i.id}`} className='details'>
                      <img
                        className={styles.portrait}
                        src={`https://image.tmdb.org/t/p/w300/${
                          i.profile_path
                        }`}
                        alt={i.name}
                      />

                      {i.name}
                    </Link>
                  </li>
                ))}
            </div>
          </div>
        </React.Fragment>
      );
  }
}
