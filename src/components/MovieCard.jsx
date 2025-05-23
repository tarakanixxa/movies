import React from 'react';
import { useNavigate } from 'react-router-dom';

const MovieCard = ({ movie }) => {
  const navigate = useNavigate();

  const posterName = movie.poster.replace('.jpg', '').replace('/', '');

  return (
    <div className="movie-slide" style={{ backgroundImage: `url(${movie.poster})` }}>
      <div className="movie-blur-overlay" />

      <div className="movie-left">
        <img src={movie.poster} alt={movie.title} className="movie-poster" />
        <h2 className="movie-title">{movie.title}</h2>
        <button
          className="custom-button"
          onClick={() => navigate(`/booking/${posterName}`)}
        >
          <span>Забронювати</span>
        </button>
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
