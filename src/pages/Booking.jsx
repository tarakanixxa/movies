import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import CinemaHall from '../components/CinemaHall';
import movies from '../data/movies';

const Booking = () => {
  const { title } = useParams(); 
  const posterPath = `/${title}.jpg`;

  const movie = movies.find((m) =>
    m.poster.replace('.jpg', '').replace('/', '') === title
  );

  useEffect(() => {
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, []);

  return (
    <div>
      <h1 className="booking-title">
        Бронювання для фільму: {movie ? movie.title : 'невідомо'}
      </h1>
      <CinemaHall posterPath={posterPath} />
    </div>
  );
};

export default Booking;
