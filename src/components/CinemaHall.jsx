import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import chairIcon from '../assets/cinema-chair.svg';

const CinemaHall = () => {
  const seatLayout = [
    ...Array(4).fill(5),
    ...Array(2).fill(8),
  ];

  const [selectedSeats, setSelectedSeats] = useState([]);
  const navigate = useNavigate();

  const toggleSeat = (row, index) => {
    const seatId = `${row}-${index}`;
    setSelectedSeats(prev =>
      prev.includes(seatId)
        ? prev.filter(s => s !== seatId)
        : [...prev, seatId]
    );
  };

  return (
    <div className="cinema-hall">
      {seatLayout.map((seatsInRow, row) => (
        <div className="row" key={row}>
          {Array.from({ length: seatsInRow }, (_, i) => {
            const seatId = `${row}-${i}`;
            const isSelected = selectedSeats.includes(seatId);

            return (
              <img
                key={seatId}
                src={chairIcon}
                alt="seat"
                className={`seat ${isSelected ? 'selected' : 'available'}`}
                onClick={() => toggleSeat(row, i)}
              />
            );
          })}
        </div>
      ))}

      <p className="selected-seats">
        Вибрані місця: {selectedSeats.join(', ') || 'немає'}
      </p>

      <button
        className="custom-buttons"
        onClick={() => navigate('/home')}
      >
        <span>На головну</span>
      </button>
    </div>
  );
};

export default CinemaHall;
