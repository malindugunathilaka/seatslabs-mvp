import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import '../styles/Booking.css';

function Booking({ services, addBooking }) {
  const location = useLocation();
  const navigate = useNavigate();
  
  // Get pre-selected service from navigation state
  const preSelectedService = location.state?.selectedService;

  // Form state
  const [formData, setFormData] = useState({
    customerName: '',
    phone: '',
    vehicleNumber: '',
    service: preSelectedService?.name || '',
    date: '',
    time: '',
    notes: ''
  });

  const [errors, setErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Available time slots
  const timeSlots = [
    '09:00 AM', '09:30 AM', '10:00 AM', '10:30 AM',
    '11:00 AM', '11:30 AM', '12:00 PM', '12:30 PM',
    '02:00 PM', '02:30 PM', '03:00 PM', '03:30 PM',
    '04:00 PM', '04:30 PM', '05:00 PM', '05:30 PM'
  ];

  // Get minimum date (today)
  const getMinDate = () => {
    const today = new Date();
    return today.toISOString().split('T')[0];
  };

  // Get maximum date (30 days from now)
  const getMaxDate = () => {
    const maxDate = new Date();
    maxDate.setDate(maxDate.getDate() + 30);
    return maxDate.toISOString().split('T')[0];
  };

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user types
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  // Validate form
  const validateForm = () => {
    const newErrors = {};

    if (!formData.customerName.trim()) {
      newErrors.customerName = 'Name is required';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^0\d{9}$/.test(formData.phone)) {
      newErrors.phone = 'Enter valid phone (e.g., 0771234567)';
    }

    if (!formData.vehicleNumber.trim()) {
      newErrors.vehicleNumber = 'Vehicle number is required';
    }

    if (!formData.service) {
      newErrors.service = 'Please select a service';
    }

    if (!formData.date) {
      newErrors.date = 'Please select a date';
    }

    if (!formData.time) {
      newErrors.time = 'Please select a time slot';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      addBooking(formData);
      setIsSubmitted(true);
    }
  };

  // Success message component
  if (isSubmitted) {
    return (
      <div className="booking-page">
        <div className="success-container">
          <div className="success-icon">✅</div>
          <h2>Booking Confirmed!</h2>
          <p>Your appointment has been successfully booked.</p>
          
          <div className="booking-summary">
            <h3>Booking Details</h3>
            <div className="summary-item">
              <span className="label">Name:</span>
              <span className="value">{formData.customerName}</span>
            </div>
            <div className="summary-item">
              <span className="label">Service:</span>
              <span className="value">{formData.service}</span>
            </div>
            <div className="summary-item">
              <span className="label">Date:</span>
              <span className="value">{formData.date}</span>
            </div>
            <div className="summary-item">
              <span className="label">Time:</span>
              <span className="value">{formData.time}</span>
            </div>
            <div className="summary-item">
              <span className="label">Vehicle:</span>
              <span className="value">{formData.vehicleNumber}</span>
            </div>
          </div>

          <div className="success-actions">
            <button 
              className="btn btn-primary"
              onClick={() => {
                setIsSubmitted(false);
                setFormData({
                  customerName: '',
                  phone: '',
                  vehicleNumber: '',
                  service: '',
                  date: '',
                  time: '',
                  notes: ''
                });
              }}
            >
              Book Another
            </button>
            <button 
              className="btn btn-secondary"
              onClick={() => navigate('/')}
            >
              Go Home
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="booking-page">
      {/* Page Header */}
      <div className="page-header">
        <h1>Book Your Appointment</h1>
        <p>Fill in the details below to reserve your service slot</p>
      </div>

      {/* Booking Form */}
      <form className="booking-form" onSubmit={handleSubmit}>
        {/* Customer Details Section */}
        <div className="form-section">
          <h3 className="section-title">Customer Details</h3>
          
          <div className="form-group">
            <label htmlFor="customerName">Full Name *</label>
            <input
              type="text"
              id="customerName"
              name="customerName"
              value={formData.customerName}
              onChange={handleChange}
              placeholder="Enter your full name"
              className={errors.customerName ? 'error' : ''}
            />
            {errors.customerName && (
              <span className="error-message">{errors.customerName}</span>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="phone">Phone Number *</label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="0771234567"
              className={errors.phone ? 'error' : ''}
            />
            {errors.phone && (
              <span className="error-message">{errors.phone}</span>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="vehicleNumber">Vehicle Number *</label>
            <input
              type="text"
              id="vehicleNumber"
              name="vehicleNumber"
              value={formData.vehicleNumber}
              onChange={handleChange}
              placeholder="CAB-1234"
              className={errors.vehicleNumber ? 'error' : ''}
            />
            {errors.vehicleNumber && (
              <span className="error-message">{errors.vehicleNumber}</span>
            )}
          </div>
        </div>

        {/* Service Selection Section */}
        <div className="form-section">
          <h3 className="section-title">Select Service</h3>
          
          <div className="form-group">
            <label htmlFor="service">Service Type *</label>
            <select
              id="service"
              name="service"
              value={formData.service}
              onChange={handleChange}
              className={errors.service ? 'error' : ''}
            >
              <option value="">-- Select a Service --</option>
              {services.map(service => (
                <option key={service.id} value={service.name}>
                  {service.name} - {service.duration} - Rs. {service.price.toLocaleString()}
                </option>
              ))}
            </select>
            {errors.service && (
              <span className="error-message">{errors.service}</span>
            )}
          </div>
        </div>

        {/* Date & Time Section */}
        <div className="form-section">
          <h3 className="section-title">Select Date & Time</h3>
          
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="date">Date *</label>
              <input
                type="date"
                id="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                min={getMinDate()}
                max={getMaxDate()}
                className={errors.date ? 'error' : ''}
              />
              {errors.date && (
                <span className="error-message">{errors.date}</span>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="time">Time Slot *</label>
              <select
                id="time"
                name="time"
                value={formData.time}
                onChange={handleChange}
                className={errors.time ? 'error' : ''}
              >
                <option value="">-- Select Time --</option>
                {timeSlots.map(slot => (
                  <option key={slot} value={slot}>{slot}</option>
                ))}
              </select>
              {errors.time && (
                <span className="error-message">{errors.time}</span>
              )}
            </div>
          </div>
        </div>

        {/* Additional Notes */}
        <div className="form-section">
          <h3 className="section-title">Additional Notes (Optional)</h3>
          
          <div className="form-group">
            <label htmlFor="notes">Special Requests or Issues</label>
            <textarea
              id="notes"
              name="notes"
              value={formData.notes}
              onChange={handleChange}
              placeholder="Describe any specific issues or requests..."
              rows="3"
            />
          </div>
        </div>

        {/* Submit Button */}
        <div className="form-actions">
          <button type="submit" className="btn btn-primary btn-large">
            Confirm Booking
          </button>
        </div>
      </form>
    </div>
  );
}

export default Booking;
