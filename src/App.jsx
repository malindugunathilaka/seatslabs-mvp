import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Services from './pages/Services';
import Booking from './pages/Booking';
import AdminDashboard from './pages/AdminDashboard';
import './styles/App.css';

function App() {
  // Shared state for bookings (MVP - no backend yet)
  const [bookings, setBookings] = useState([
    {
      id: 1,
      customerName: 'Kasun Perera',
      phone: '0771234567',
      vehicleNumber: 'CAB-1234',
      service: 'Oil Change',
      date: '2025-01-20',
      time: '10:00 AM',
      status: 'Pending'
    },
    {
      id: 2,
      customerName: 'Nimal Silva',
      phone: '0779876543',
      vehicleNumber: 'WP-5678',
      service: 'Brake Repair',
      date: '2025-01-20',
      time: '02:00 PM',
      status: 'Confirmed'
    }
  ]);

  // Services data
  const services = [
    { id: 1, name: 'Oil Change', duration: '30 mins', price: 2500, description: 'Complete oil change with filter replacement' },
    { id: 2, name: 'Brake Repair', duration: '1 hour', price: 5000, description: 'Brake pad inspection and replacement' },
    { id: 3, name: 'Full Service', duration: '2 hours', price: 8000, description: 'Complete vehicle checkup and maintenance' },
    { id: 4, name: 'Engine Diagnostics', duration: '45 mins', price: 3500, description: 'Computer diagnostics and error scanning' },
    { id: 5, name: 'Tire Replacement', duration: '1 hour', price: 4000, description: 'Tire mounting and wheel balancing' },
    { id: 6, name: 'AC Repair', duration: '1.5 hours', price: 6000, description: 'AC gas refill and system check' }
  ];

  // Add new booking
  const addBooking = (newBooking) => {
    const booking = {
      ...newBooking,
      id: bookings.length + 1,
      status: 'Pending'
    };
    setBookings([...bookings, booking]);
  };

  // Update booking status
  const updateBookingStatus = (id, newStatus) => {
    setBookings(bookings.map(booking =>
      booking.id === id ? { ...booking, status: newStatus } : booking
    ));
  };

  return (
    <BrowserRouter>
      <div className="app">
        <Navbar />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home services={services} />} />
            <Route path="/services" element={<Services services={services} />} />
            <Route path="/booking" element={<Booking services={services} addBooking={addBooking} />} />
            <Route path="/admin" element={<AdminDashboard bookings={bookings} updateBookingStatus={updateBookingStatus} />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
