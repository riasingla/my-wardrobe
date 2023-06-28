import React, { useState } from 'react';
import { authService } from '../Service/api';
import { useNavigate } from 'react-router-dom'; 
import './Login.css';

const Login = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  // eslint-disable-next-line no-unused-vars
  const [error, setError] = useState(null);
  const [errorMessages, setErrorMessages] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email) {
      setErrorMessages(['Email is required']);
      return;
    }

    if (!password) {
      setErrorMessages(['Password is required']);
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setErrorMessages(['Please enter a valid email']);
      return;
    }
  
    authService
      .login({ email, password })
      .then((response) => {
        console.log(response.data);
        setSuccessMessage('You have successfully logged in!');
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('userId', response.data.userId);
        console.log(localStorage.getItem('token'));
        // Check the user role and redirect accordingly
          navigate('/Items');
      })
      .catch((error) => {
        console.error(error);
        setError('Login not successful');
      });
  };

  return (
    <div className='Login-container'>
      <form onSubmit={handleSubmit}>
      <h2>Login</h2>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        {errorMessages && errorMessages.length > 0 && (
  <div className="error-messages">
    {errorMessages.map((errorMessage, index) => (
      <div key={index} className="error-message">
        {errorMessage}
      </div>
    ))}
  </div>
)}
{error && <div className="error-message">{error}</div>}
        <button type="submit">Login</button>
      </form>
      {successMessage && <p>{successMessage}</p>}
    </div>
  );
};

export default Login;
