import React, { useState } from 'react';
import moviesData from './data/movies';
import MovieList from './components/MovieList';

const App = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredMovies = moviesData.filter((movie) =>
    movie.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="app">
      <input
        type="text"
        placeholder="Пошук за назвою фільму"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="search-input"
      />
      <MovieList movies={filteredMovies} />
    </div>
  );
};

export default App;
