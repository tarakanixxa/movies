
const BOOKING_STORAGE_KEY = 'cinema_bookings';

export const BookingService = {
  saveBooking: (movieId, bookingData) => {
    const allBookings = JSON.parse(localStorage.getItem(BOOKING_STORAGE_KEY)) || {};
    if (!allBookings[movieId]) {
      allBookings[movieId] = [];
    }
    allBookings[movieId].push(bookingData);
    localStorage.setItem(BOOKING_STORAGE_KEY, JSON.stringify(allBookings));
  },

  getBookedSeats: (movieId) => {
    const allBookings = JSON.parse(localStorage.getItem(BOOKING_STORAGE_KEY)) || {};
    return (allBookings[movieId] || []).flatMap(b => b.seats);
  }
};
