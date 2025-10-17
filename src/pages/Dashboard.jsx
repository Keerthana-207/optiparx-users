import { useEffect, useState } from 'react';

function Dashboard({ userData, onLogout, onNavigate }) {
  const deviceMessages = [
    "Slot 1: detected",
    "Slot 1: detected",
    "Slot 1: detected",
    "Slot 1: detected"
  ];

  return (
    <div className="container">
      <div className="step active">
        <img src="logo.png" alt="OptiParX Logo" className="logo" />
        <h2>Welcome, {userData?.username || 'User'}</h2>

        <div style={{ margin: '20px 0' }}>
          <h3>Device Messages:</h3>
          <ul>
            {deviceMessages.map((msg, index) => (
              <li key={index}>
                <strong>{msg}</strong>
              </li>
            ))}
          </ul>
        </div>

        <div className="btn-container">
          <button onClick={() => onNavigate('book')}>Book a Slot</button>
          <button onClick={() => onNavigate('history')}>View Booking History</button>
          <button onClick={() => onNavigate('edit-profile')}>Edit Profile</button>
          <button onClick={onLogout}>Logout</button>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;

