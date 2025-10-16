import { useState } from "react";

function User({ userData, setUserData, onNext }) {
  function handleChange(e) {
    const { id, value } = e.target;
    setUserData((prev) => ({
      ...prev,
      [id]: value,
    }));
  }

  function goToStep2() {
    const { username, carPlate, phone, email, duration } = userData;
    if (!username || !carPlate || !duration) {
      alert("Please fill all fields.");
      return;
    }

    if (!phone && !email) {
      alert("Please provide either phone number or an email address.");
      return;
    }
    onNext();
  }

  return (
    <div className="container">
      <div className="step active">
        <img src="logo.png" alt="OptiParX Logo" className="logo" />
        <h2>Welcome to OptiParX</h2>
        <form id="userForm">
          <label>Username</label>
          <input type="text" id="username" value={userData.username} onChange={handleChange} required />

          <label>Car Plate Number</label>
          <input type="text" id="carPlate" value={userData.carPlate} onChange={handleChange} required />

          <label>Phone Number</label>
          <input type="text" id="phone" value={userData.phone} onChange={handleChange} />
          <p> Or </p>
          <label>Email</label>
          <input type="email" id="email" value={userData.email} onChange={handleChange} />

          <label>Parking Duration</label>
          <select id="duration" value={userData.duration} onChange={handleChange} required>
            <option value="">-- Select Duration --</option>
            <option>30 min</option>
            <option>1 hr</option>
            <option>2 hrs</option>
            <option>3 hrs</option>
            <option>4 hrs</option>
            <option>Full Day</option>
          </select>

          <button type="button" onClick={goToStep2}>Next</button>
        </form>
      </div>
    </div>
  );
}

export default User;
