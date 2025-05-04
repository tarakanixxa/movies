import React from 'react';
import { useParams } from 'react-router-dom';
import CinemaHall from '../components/CinemaHall';

const Booking = () => {
  const { id } = useParams();

  return (
    <div>
      <h1>Бронювання для фільму №{id}</h1>
      <CinemaHall />
    </div>
  );
};

export default Booking;
