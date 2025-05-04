import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import Booking from './pages/Booking';

const App = () => (
  <Router>
    <Routes>
      <Route path="/" element={<Navigate to="/home" replace />} />
      <Route path="/home" element={<Home />} />
      <Route path="/booking/:id" element={<Booking />} />
    </Routes>
  </Router>
);

export default App;
