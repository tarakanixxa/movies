import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import CinemaHall from '../components/CinemaHall';

const Booking = () => {
  const { id } = useParams();

  useEffect(() => {

    const originalOverflow = document.body.style.overflow;

    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, []);

  return (
    <div>
      <h1>Бронювання для фільму №{id}</h1>
      <CinemaHall />
    </div>
  );
};

export default Booking;
