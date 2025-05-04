import React, { useState, useEffect, useRef } from 'react';
import moviesData from './data/movies';
import MovieList from './components/MovieList';

const App = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const movieListRef = useRef(null); 

  useEffect(() => {
    const handleWheel = (event) => {
      if (event.deltaY !== 0) {
        event.preventDefault(); 
        movieListRef.current.scrollLeft += event.deltaY; 
      }
    };

    if (movieListRef.current) {
      movieListRef.current.addEventListener('wheel', handleWheel, { passive: false });
    }

    return () => {
      if (movieListRef.current) {
        movieListRef.current.removeEventListener('wheel', handleWheel);
      }
    };
  }, []);

  const scroll = (direction) => {
    if (movieListRef.current) {
      const scrollAmount = 300; 
      movieListRef.current.scrollLeft += direction === 'left' ? -scrollAmount : scrollAmount;
    }
  };

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

  
      <button className="scroll-button left" onClick={() => scroll('left')}>
        ❮
      </button>
      <button className="scroll-button right" onClick={() => scroll('right')}>
        ❯
      </button>

      <MovieList ref={movieListRef} movies={filteredMovies} />
    </div>
  );
};

export default App;
