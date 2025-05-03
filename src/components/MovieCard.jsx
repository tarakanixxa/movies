import React from 'react';

const MovieCard = ({ movie }) => {
  return (
    <div className="movie-slide">
      <div className="movie-left">
        <img src={movie.poster} alt={movie.title} className="movie-poster" />
        <h2 className="movie-title">{movie.title}</h2>
      </div>
      <div className="movie-right">
        <p className="movie-description">{movie.description}</p>
        <p className="movie-genre">{movie.genre}</p>
        <p className="movie-date">{movie.date}</p>
      </div>
    </div>
  );
};

export default MovieCard;