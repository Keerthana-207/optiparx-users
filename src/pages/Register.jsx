import { useState } from 'react';

function Register({ onSuccess }) {
  const [formData, setFormData] = useState({
    username: '',
    phone: '',
    email: '',
    password: '',
  });

  function handleChange(e) {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  }

  function handleRegister() {
  const { username, phone, email, password } = formData;
  if (!username || !password || (!phone && !email)) {
    alert("Please fill all required fields.");
    return;
  }

  fetch('https://optiparx-backend-9gc0lmpqj-keerthana-207s-projects.vercel.app/register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(formData)
  })
    .then(res => {
      if (res.ok) return res.json();
      return res.json().then(err => { throw new Error(err.message); });
    })
    .then(data => {
      // alert(data.message);
      onSuccess();
    })
    .catch(err => {
      alert("Registration failed: " + err.message);
    });
}


  return (
    <div className="container">
      <div className="step active">
        <h2>Register</h2>
        <form>
          <label>Username</label>
          <input type="text" id="username" value={formData.username} onChange={handleChange} required />

          <label>Phone Number</label>
          <input type="text" id="phone" value={formData.phone} onChange={handleChange} />
          <p>Or</p>
          <label>Email</label>
          <input type="email" id="email" value={formData.email} onChange={handleChange} />

          <label>Password</label>
          <input type="password" id="password" value={formData.password} onChange={handleChange} required />

          <button type="button" onClick={handleRegister}>Register</button>
        </form>
      </div>
    </div>
  );
}

export default Register;
