import React, { useState } from 'react';
import './Register.css';
import { authService } from '../Service/api';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const navigate = useNavigate();

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [role, setRole] = useState('');
  const [error, setError] = useState('');
  const [errorMessages, setErrorMessages] = useState([]);
  const [successMessage, setSuccessMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email || !password || !firstName || !lastName || !confirmPassword || !role) {
      setError('Please provide all the required information.');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setErrorMessages(['Please enter a valid email']);
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match');
    }

    const userData = {
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: password,
      confirmPassword: confirmPassword,
      role: role,
    };

    authService
    .signup(userData)
    .then((response) => {
      console.log(response);
      setFirstName('');
      setLastName('');
      setEmail('');
      setPassword('');
      setConfirmPassword('');
      setRole('');
      setError('');
      setErrorMessages([]);
      setSuccessMessage('You have successfully registered!');
      if (response && response.data && response.data.token) {
        localStorage.setItem('token', response.data.token);
      }
      navigate('/Login');
    })
    .catch((error) => {
      console.error('Error occurred during signup:\n', error);
      if (error.response && Array.isArray(error.response.data)) {
        setErrorMessages(error.response.data); // Set error messages from the API response
      } else {
        setError('An error occurred during signup. Please try again.');
      }
    });

  };

  return (
    <div className="Register-container">
      <form onSubmit={handleSubmit}>
        <div>
          <label>First Name:</label>
          <input type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
        </div>
        <div>
          <label>Last Name:</label>
          <input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} />
        </div>
        <div>
          <label>Email:</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div>
          <label>Password:</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
        <div>
          <label>Password Confirmation:</label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>
        <div>
          <label>Role:</label>
          <select value={role} onChange={(e) => setRole(e.target.value)}>
            <option value="">Select a role</option>
            <option value="admin">Admin</option>
            <option value="user">User</option>
          </select>
        </div>
        {errorMessages.length > 0 && (
          <div className="error-messages">
            {errorMessages.map((errorMessage, index) => (
              <div key={index} className="error-message">
                {errorMessage}
              </div>
            ))}
          </div>
        )}
        {error && <div className="error-message">{error}</div>}
        {successMessage && <div className="success-message">{successMessage}</div>}
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
};

export default Register;
