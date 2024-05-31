import React, { useEffect, useState } from 'react'
import login from './login.module.sass'
import axios from 'axios'

const Login = () => {
  useEffect(() => {
      document.title = 'Login'
  }, [])
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8000/api/get_token/', { username, password });
      const token = response.data.token;
      localStorage.setItem('token', token);
      setMessage('Login successful');
      
    } catch (error) {
      setMessage('Invalid username or password');
    }
  }
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