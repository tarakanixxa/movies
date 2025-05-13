import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { BookingService } from '../services/BookingService';
import chairIcon from '../assets/cinema-chair.svg';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const CinemaHall = ({ posterPath, title }) => {
  const { title: movieId } = useParams();
  const seatLayout = [...Array(4).fill(5), ...Array(2).fill(8)];

  const [selectedSeats, setSelectedSeats] = useState([]);
  const [bookedSeats, setBookedSeats] = useState([]);
  const [formData, setFormData] = useState({ name: '', phone: '', email: '' });
  const [errors, setErrors] = useState({});
  const [showForm, setShowForm] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const seats = BookingService.getBookedSeats(movieId);
    setBookedSeats(seats);
  }, [movieId]);

  const toggleSeat = (row, index) => {
    const seatId = `${row}-${index}`;
    if (bookedSeats.includes(seatId)) return;

    setSelectedSeats((prev) =>
      prev.includes(seatId)
        ? prev.filter((s) => s !== seatId)
        : [...prev, seatId]
    );
  };

  const validate = () => {
    const errs = {};
    if (!formData.name.trim()) errs.name = 'Імʼя обовʼязкове';
    if (!formData.phone.trim()) errs.phone = 'Телефон обовʼязковий';
    if (!formData.email.trim()) {
      errs.email = 'Емейл обовʼязковий';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errs.email = 'Невірний формат емейлу';
    }
    return errs;
  };

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleBooking = () => {
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      toast.error('Будь ласка, виправте помилки у формі');
      return;
    }

    BookingService.saveBooking(movieId, {
      ...formData,
      seats: selectedSeats,
      timestamp: Date.now()
    });

    toast.success('Бронювання успішно збережено!');
    setBookedSeats(prev => [...prev, ...selectedSeats]);
    setSelectedSeats([]);
    setFormData({ name: '', phone: '', email: '' });
    setShowForm(false);
  };

  return (
    <div className="cinemahall-wrapper">
      <div
        className="cinemahall-background"
        style={{ backgroundImage: `url(${posterPath})` }}
      />
      <div className="cinema-hall">
        <h1 className="booking-title">Бронювання для фільму: {title}</h1>

        <div className="booking-buttons-container">
          {selectedSeats.length > 0 && !showForm && (
            <button className="custom-button" onClick={() => setShowForm(true)}>
              <span>Забронювати</span>
            </button>
          )}

          {showForm && (
            <button className="custom-button" type="button" onClick={handleBooking}>
              <span>Підтвердити</span>
            </button>
          )}
        </div>

        <div className="seat-container">
          {seatLayout.map((seatsInRow, row) => (
            <div className="row" key={row}>
              {Array.from({ length: seatsInRow }, (_, i) => {
                const seatId = `${row + 1}-${i + 1}`;
                const isSelected = selectedSeats.includes(seatId);
                const isBooked = bookedSeats.includes(seatId);

                return (
                  <img
                    key={seatId}
                    src={chairIcon}
                    alt="seat"
                    className={`seat ${isBooked ? 'booked' : isSelected ? 'selected' : 'available'}`}
                    onClick={() => toggleSeat(row + 1, i + 1)}
                  />
                );
              })}
            </div>
          ))}
        </div>

        <p className="selected-seats">
          Вибрані місця: {selectedSeats.join(', ') || 'немає'}
        </p>

       {showForm && (
  <div className="modal">
    <div className="container">
      <form className="form">
        <div className="form_front">
          <div className="form_details">Бронювання</div>

          <input
            placeholder="Імʼя"
            className="input"
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
          {errors.name && <p className="error">{errors.name}</p>}

          <input
            placeholder="Телефон"
            className="input"
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
          />
          {errors.phone && <p className="error">{errors.phone}</p>}

          <input
            placeholder="Email"
            className="input"
            type="text"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
          {errors.email && <p className="error">{errors.email}</p>}

          <button type="button" className="btn" onClick={handleBooking}>
            Підтвердити
          </button>

          <span className="switch">
            <button type="button" className="btn cancel" onClick={() => setShowForm(false)}>
              Скасувати
            </button>
          </span>
        </div>
      </form>
    </div>
  </div>
)}



        <button className="custom-button" onClick={() => navigate('/home')}>
          <span>На головну</span>
        </button>
      </div>
    </div>
  );
};

export default CinemaHall;
