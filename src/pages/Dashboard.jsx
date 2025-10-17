import { useEffect, useState } from 'react';

function Dashboard({ userData, onLogout, onNavigate }) {
  const [deviceMessages, setDeviceMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDeviceMessages = async () => {
      try {
        const res = await fetch('https://optiparx-backend-9gc0lmpqj-keerthana-207s-projects.vercel.app/api/slots/device-messages');
        const data = await res.json();
        setDeviceMessages(data.messages || []);
      } catch (err) {
        console.error("Error fetching device messages:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchDeviceMessages();
  }, []);

  return (
    <div className="container">
      <div className="step active">
        <img src="logo.png" alt="OptiParX Logo" className="logo" />
        <h2>Welcome, {userData?.username || 'User'}</h2>

        <div style={{ margin: '20px 0' }}>
          <h3>Device Messages:</h3>
          {loading ? (
            <p>Loading...</p>
          ) : deviceMessages.length === 0 ? (
            <p>No messages yet</p>
          ) : (
            <ul>
              
                <li>
                  <strong>Slot 1:</strong> detected
                </li>
              <li>
                <strong>Slot 1:</strong> detected
              </li>
              <li>
                  <strong>Slot 1:</strong> detected
                </li>
              <li>
                <strong>Slot 1:</strong> detected
              </li>
              <li>
                  <strong>Slot 1:</strong> detected
                </li>
              <li>
                <strong>Slot 1:</strong> detected
              </li>
            </ul>
          )}
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
