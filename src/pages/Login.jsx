import { useState } from 'react';

function Login({ onSuccess }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  function handleLogin() {
    if (!username || !password) {
      alert("Please fill in all fields.");
      return;
    }

    fetch('http://localhost:3000/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ username, password })
    })
      .then(res => {
        if (res.ok) return res.json();
        return res.json().then(err => { throw new Error(err.message); });
      })
      .then(data => {
        // alert(data.message);
        onSuccess(data.user); 
      })
      .catch(err => {
        alert("Login failed: " + err.message);
      });
  }

  return (
    <div className="container">
      <div className="step active">
        <img src="logo.png" alt="OptiParX Logo" className="logo" />
        <h2>Login</h2>
        <form>
          <label>Username</label>
          <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} required />

          <label>Password</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />

          <button type="button" onClick={handleLogin}>Login</button>
        </form>
      </div>
    </div>
  );
}

export default Login;
