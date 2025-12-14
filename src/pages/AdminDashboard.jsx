import React, { useState } from 'react';
import '../styles/AdminDashboard.css';

function AdminDashboard({ bookings, updateBookingStatus }) {
  const [filterStatus, setFilterStatus] = useState('All');
  const [filterDate, setFilterDate] = useState('');

  // Status options
  const statusOptions = ['Pending', 'Confirmed', 'In Progress', 'Completed', 'Cancelled'];

  // Filter bookings
  const filteredBookings = bookings.filter(booking => {
    const statusMatch = filterStatus === 'All' || booking.status === filterStatus;
    const dateMatch = !filterDate || booking.date === filterDate;
    return statusMatch && dateMatch;
  });

  // Get status badge class
  const getStatusClass = (status) => {
    const statusClasses = {
      'Pending': 'status-pending',
      'Confirmed': 'status-confirmed',
      'In Progress': 'status-progress',
      'Completed': 'status-completed',
      'Cancelled': 'status-cancelled'
    };
    return statusClasses[status] || '';
  };

  // Statistics
  const stats = {
    total: bookings.length,
    pending: bookings.filter(b => b.status === 'Pending').length,
    confirmed: bookings.filter(b => b.status === 'Confirmed').length,
    inProgress: bookings.filter(b => b.status === 'In Progress').length,
    completed: bookings.filter(b => b.status === 'Completed').length
  };

  return (
    <div className="admin-dashboard">
      {/* Page Header */}
      <div className="page-header">
        <h1>Admin Dashboard</h1>
        <p>Manage all bookings and appointments</p>
      </div>

      {/* Statistics Cards */}
      <div className="stats-container">
        <div className="stat-card">
          <span className="stat-number">{stats.total}</span>
          <span className="stat-label">Total Bookings</span>
        </div>
        <div className="stat-card pending">
          <span className="stat-number">{stats.pending}</span>
          <span className="stat-label">Pending</span>
        </div>
        <div className="stat-card confirmed">
          <span className="stat-number">{stats.confirmed}</span>
          <span className="stat-label">Confirmed</span>
        </div>
        <div className="stat-card progress">
          <span className="stat-number">{stats.inProgress}</span>
          <span className="stat-label">In Progress</span>
        </div>
        <div className="stat-card completed">
          <span className="stat-number">{stats.completed}</span>
          <span className="stat-label">Completed</span>
        </div>
      </div>

      {/* Filters */}
      <div className="filters-container">
        <div className="filter-group">
          <label htmlFor="statusFilter">Filter by Status:</label>
          <select
            id="statusFilter"
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
          >
            <option value="All">All Status</option>
            {statusOptions.map(status => (
              <option key={status} value={status}>{status}</option>
            ))}
          </select>
        </div>

        <div className="filter-group">
          <label htmlFor="dateFilter">Filter by Date:</label>
          <input
            type="date"
            id="dateFilter"
            value={filterDate}
            onChange={(e) => setFilterDate(e.target.value)}
          />
        </div>

        {(filterStatus !== 'All' || filterDate) && (
          <button 
            className="btn btn-secondary"
            onClick={() => {
              setFilterStatus('All');
              setFilterDate('');
            }}
          >
            Clear Filters
          </button>
        )}
      </div>

      {/* Bookings Table */}
      <div className="bookings-container">
        <h2>Bookings ({filteredBookings.length})</h2>
        
        {filteredBookings.length > 0 ? (
          <div className="table-wrapper">
            <table className="bookings-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Customer</th>
                  <th>Phone</th>
                  <th>Vehicle</th>
                  <th>Service</th>
                  <th>Date</th>
                  <th>Time</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredBookings.map(booking => (
                  <tr key={booking.id}>
                    <td>#{booking.id}</td>
                    <td>{booking.customerName}</td>
                    <td>{booking.phone}</td>
                    <td>{booking.vehicleNumber}</td>
                    <td>{booking.service}</td>
                    <td>{booking.date}</td>
                    <td>{booking.time}</td>
                    <td>
                      <span className={`status-badge ${getStatusClass(booking.status)}`}>
                        {booking.status}
                      </span>
                    </td>
                    <td>
                      <div className="action-buttons">
                        <select
                          value={booking.status}
                          onChange={(e) => updateBookingStatus(booking.id, e.target.value)}
                          className="status-select"
                        >
                          {statusOptions.map(status => (
                            <option key={status} value={status}>{status}</option>
                          ))}
                        </select>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="no-bookings">
            <span className="no-bookings-icon">📋</span>
            <p>No bookings found</p>
            {(filterStatus !== 'All' || filterDate) && (
              <p className="hint">Try adjusting your filters</p>
            )}
          </div>
        )}
      </div>

      {/* Quick Actions */}
      <div className="quick-actions">
        <h3>Quick Actions</h3>
        <div className="action-cards">
          <div className="action-card">
            <span className="action-icon">📊</span>
            <h4>View Reports</h4>
            <p>Coming in Phase 2</p>
          </div>
          <div className="action-card">
            <span className="action-icon">👨‍🔧</span>
            <h4>Manage Staff</h4>
            <p>Coming in Phase 2</p>
          </div>
          <div className="action-card">
            <span className="action-icon">⚙️</span>
            <h4>Settings</h4>
            <p>Coming in Phase 2</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
