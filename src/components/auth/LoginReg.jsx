import React, { useState } from 'react';
import './loginReg.css';
import { MdOutlineClear } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';

export const LoginReg = ({ handleLoginClose }) => {
  const [register, setRegister] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [registerUsername, setRegisterUsername] = useState('');
  const [registerPassword, setRegisterPassword] = useState('');
  const navigate = useNavigate()

  

  const handleFormSubmit = (event) => {
    event.preventDefault();

    if (register) {
      // Handle user registration
      localStorage.setItem('username', registerUsername);
      localStorage.setItem('password', registerPassword);
      setRegisterUsername('');
      setRegisterPassword('');
      setRegister(false);
      navigate('/personalPG');
    } else {
      const storedUsername = localStorage.getItem('username');
      const storedPassword = localStorage.getItem('password');

      if (username === storedUsername && password === storedPassword) {
        setUsername('');
        setPassword('');
        handleLoginClose();
        navigate('/personalPG')
      } else {
        // Handle invalid login
        setUsername('');
        setPassword('');
        alert('Invalid username or password');
      }
    }
  };

  const handleRegisterClick = () => {
    setRegister(!register);
    setUsername('');
    setPassword('');
    setRegisterUsername('');
    setRegisterPassword('');
  };

  return (
    <div className='center-login'>
      <div className="login-container">
        <div className="clear-login" onClick={handleLoginClose}>
          <MdOutlineClear />
        </div>
        <div className="login-text">{register ? 'Register' : 'Login'}</div>
        <form onSubmit={handleFormSubmit}>
          {register ? (
            <div className="login-data">
              <label>New Username</label>
              <input type='text' value={registerUsername} onChange={(e) => setRegisterUsername(e.target.value)} required/>
            </div>
          ) : (
            <div className="login-data">
              <label>Username</label>
              <input type='text' value={username} onChange={(e) => setUsername(e.target.value)} required/>
            </div>
          )}
          {register ? (
            <div className="login-data">
              <label>New Password</label>
              <input type='password' value={registerPassword} onChange={(e) => setRegisterPassword(e.target.value)} required/>
            </div>
          ) : (
            <div className="login-data">
              <label>Password</label>
              <input type='password' value={password} onChange={(e) => setPassword(e.target.value)} required/>
            </div>
          )}
          <div className="login-btn">
            <div className="login-inner"></div>
            <button type='submit'>{register ? 'Register' : 'Login'}</button>
          </div>
        </form>
        <div className="register" onClick={handleRegisterClick}>
          {register ? 'Login' : 'Register'}
        </div>
      </div>
    </div>
  );
};
