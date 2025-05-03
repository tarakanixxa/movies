import React, { useState, useEffect } from 'react';
import moviesData from './data/movies';
import MovieList from './components/MovieList';

const App = () => {
  const [searchTerm, setSearchTerm] = useState('');



  const filteredMovies = moviesData.filter((movie) =>
    movie.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="app">
      <div className="search-bar">
        <input
          type="text"
          placeholder="Пошук за назвою фільму"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <i className="fa fa-search"></i>
      </div>
      <MovieList movies={filteredMovies} />
    </div>
  );
};

export default App;