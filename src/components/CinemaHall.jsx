import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import chairIcon from '../assets/cinema-chair.svg';

const CinemaHall = ({ posterPath, title }) => {
  const seatLayout = [...Array(4).fill(5), ...Array(2).fill(8)];
  const [selectedSeats, setSelectedSeats] = useState([]);
  const navigate = useNavigate();

  const toggleSeat = (row, index) => {
    const seatId = `${row}-${index}`;
    setSelectedSeats((prev) =>
      prev.includes(seatId)
        ? prev.filter((s) => s !== seatId)
        : [...prev, seatId]
    );
  };

  return (
    <div className="cinemahall-wrapper">
      <div
        className="cinemahall-background"
        style={{ backgroundImage: `url(${posterPath})` }}
      />
      <div className="cinema-hall">
        <h1 className="booking-title">
          Бронювання для фільму: {title}
        </h1>

        <div className="seat-container">
          {seatLayout.map((seatsInRow, row) => (
            <div className="row" key={row}>
              {Array.from({ length: seatsInRow }, (_, i) => {
                const seatId = `${row + 1}-${i + 1}`;
                const isSelected = selectedSeats.includes(seatId);
                return (
                  <img
                    key={seatId}
                    src={chairIcon}
                    alt="seat"
                    className={`seat ${isSelected ? 'selected' : 'available'}`}
                    onClick={() => toggleSeat(row + 1, i + 1)}
                  />
                );
              })}
            </div>
          ))}
        </div>

        <p className="selected-seats">
          Вибрані місця: 
          {selectedSeats.join(', ') || 'немає'}
        </p>

        <button className="custom-button" onClick={() => navigate('/home')}>
          <span>На головну</span>
        </button>
      </div>
    </div>
  );
};

export default CinemaHall;
