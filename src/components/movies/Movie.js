import React from "react";
import { Link } from "react-router-dom";

export default function Movie(props) {
  const { movie } = props;
  // const ov = movie.overview;
  
  const posterImageUrl = `https://image.tmdb.org/t/p/w500/`;
  return (
    <article className="card">
      <div className="card-content">
        <picture>
          <img
            className="thumbnail"
            src={posterImageUrl + movie.poster_path}
            alt="movie.original_title"
          />
        </picture>
        <h3 className="movie-title">{movie.original_title}</h3>
        <h6 className="release-date">release date : {movie.release_date}</h6>
        <p className="card-text">{movie.overview}</p>
        <Link to={`lyrics/track${movie.id}`} className="details">
          More details
        </Link>
      </div>
    </article>
  );
}
