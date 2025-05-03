import React from "react";
import "./MovieCard.css";

const MovieCard = ({
  movie: { title, vote_average, poster_path, overview, release_date,original_language },
}) => {
  return (
    <div className="movie-card">
      <div class="wrapperCard">
        <div class="movieCard">
          <img
            src={
              poster_path
                ? `https://image.tmdb.org/t/p/w500/${poster_path}`
                : "./no-movie.png"
            }
            alt="Movie Poster"
          />
          <div class="descriptions">
            <h2>{title}</h2>
            <p>{overview}</p>
          </div>
        </div>

        <div className="content">
        <h3>{title}</h3>
        </div>
        <div class="content">
          <div class=" rating">
            <img src="./star.svg" alt="Star icon" />
            <p>{vote_average ? vote_average.toFixed(1) : "N/A"}</p>
          </div>
          <span>•</span>
          <div class="lang">
            <p>{original_language}</p>
          </div>
          <span>•</span>
          <div class="year">
            <p>{release_date ? release_date.split("-")[0] : "N/A"}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
