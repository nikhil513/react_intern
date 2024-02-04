import React, { useState } from 'react';
import './login.css'
import { useNavigate } from 'react-router-dom';
import Lights from './backgound';

const LoginPage = () => {
  
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();

  const handleHome = () => {
    navigate('/home');
};

  return (
    <div className='login'>
      <h2>Login Page</h2>
      <form onSubmit={handleHome}>
        <div>
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div>
        <Lights />
        <p> <button onClick={handleHome}>submit</button></p>
        </div>
      </form>
    </div>
  );
};

export default LoginPage;
