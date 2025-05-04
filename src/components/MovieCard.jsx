import React from 'react';

const MovieCard = ({ movie }) => {
  return (
    <div
      className="movie-slide"
      style={{ backgroundImage: `url(${movie.poster})` }}
    >
      <div className="movie-blur-overlay" />

      <div className="movie-left">
        <img src={movie.poster} alt={movie.title} className="movie-poster" />
        <h2 className="movie-title">{movie.title}</h2>
      </div>

      <div className="movie-right">
        <p className="movie-description">{movie.description}</p>
        <div className="movie-bottom">
          <p>{movie.genre}</p>
          <p>{movie.date}</p>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
