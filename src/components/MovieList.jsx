import React, { forwardRef } from 'react';
import MovieCard from './MovieCard';

const MovieList = forwardRef(({ movies }, ref) => {
  return (
    <div className="movie-list" ref={ref}>
      {movies.map((movie) => (
        <MovieCard key={movie.id} movie={movie} />
      ))}
    </div>
  );
});

export default MovieList;
