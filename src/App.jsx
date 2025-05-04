import React, { useState, useEffect, useRef } from 'react';
import moviesData from './data/movies';
import MovieList from './components/MovieList';

const App = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const movieListRef = useRef(null); 

  const filteredMovies = moviesData.filter((movie) =>
    movie.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const scrollToIndex = (index) => {
    const container = movieListRef.current;
    const card = container?.children[index];

    if (card && container) {
      container.scrollTo({
        left: card.offsetLeft,
        behavior: 'smooth'
      });
    }
  };

  const scroll = (direction) => {
    const maxIndex = filteredMovies.length - 1;

    setCurrentIndex((prev) => {
      let newIndex = direction === 'left'
        ? (prev > 0 ? prev - 1 : maxIndex)
        : (prev < maxIndex ? prev + 1 : 0);

      scrollToIndex(newIndex);
      return newIndex;
    });
  };


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

      <button className="scroll-button left" onClick={() => scroll('left')}>❮</button>
      <button className="scroll-button right" onClick={() => scroll('right')}>❯</button>

      <MovieList ref={movieListRef} movies={filteredMovies} />
    </div>
  );
};

export default App;
