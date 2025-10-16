function Dashboard({ userData, onLogout, onNavigate }) {
  const update = async () => {
    const res = await (fetch('https://optiparx-users.netlify.app/api/slots/device-message'));
    return res.json()
    
  }
  return (
    <div className="container">
      <div className="step active">
        <img src="logo.png" alt="OptiParX Logo" className="logo" />
        <h2>Welcome, {userData?.username || 'User'}</h2>
        <div>
          {update}
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
