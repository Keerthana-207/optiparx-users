function Welcome({ onLogin, onRegister }) {
  return (
    <div className="container">
      <div className="step active">
        <img src="logo.png" alt="OptiParX Logo" className="logo" />
        <h2>Welcome to OptiParX</h2>
        <p>Your smart parking assistant</p>
        <div className="btn-container">
            <button onClick={onLogin}>Login</button>
            <button onClick={onRegister}>Register</button>
        </div>
      </div>
    </div>
  );
}
export default Welcome;
