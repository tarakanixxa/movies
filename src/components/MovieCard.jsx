import React from 'react';
import { useNavigate } from 'react-router-dom';

const MovieCard = ({ movie }) => {
  const navigate = useNavigate();

  return (
    <div className="movie-slide" style={{ backgroundImage: `url(${movie.poster})` }}>
      <div className="movie-blur-overlay" />

      <div className="movie-left">
        <img src={movie.poster} alt={movie.title} className="movie-poster" />
        <h2 className="movie-title">{movie.title}</h2>
        <button onClick={() => navigate(`/booking/${movie.id}`)}>Забронювати</button>
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
