import React, { useEffect, useState } from 'react'
import login from '../styles/login.module.sass'
import axios from 'axios'

const Login = ({ onLogin }) => {
  useEffect(() => {
      document.title = 'Login'
  }, [])
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get('/api/get_token/', {
        params: {
          username: username,
          password: password,
        },
      });
      const token = response.data.token;
      const group = response.data.group;
      localStorage.setItem('token', token);
      localStorage.setItem('group', group);
      setMessage('Login successful');
      onLogin(true);
    } catch (error) {
      setMessage('Invalid username or password');
    }
  };
  return (
    <div className={login.login}>
        <h1>Login</h1>
        {message && <p className={login.error}>{message}</p>}
        <form onSubmit={handleLogin}>
            <label htmlFor='username'>Username:</label>
            <input type='text' id='username' name='username' value={username} onChange={(e) => setUsername(e.target.value)} />
            <label htmlFor='password'>Password:</label>
            <input type='password' id='password' name='password' value={password} onChange={(e) => setPassword(e.target.value)} />
            <button type='submit'>Login</button>
        </form>
    </div>
  )
}

export default Login