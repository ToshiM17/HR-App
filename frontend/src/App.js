import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom';
import Login from './components/Login';
import Home from './components/Home';
import Calendar from './components/Calendar';
import Projects from './components/Projects';
import React, { useEffect, useState } from 'react';
import './components/style.sass';

function App() {
  const [isLogged, setIsLogged] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsLogged(true);
    }
  }, []);

  const handleLogin = (status) => {
    setIsLogged(status);
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={isLogged ? <Home /> : <Navigate to="/login" />} />
        <Route path='/login' element={isLogged ? <Navigate to="/home" /> : <Login onLogin={handleLogin} />} />
        <Route path='/home' element={isLogged ? <Home /> : <Navigate to="/login" />} />
        <Route path='/calendar' element={isLogged ? <Calendar /> : <Navigate to="/login" />} />
        <Route path='/projects' element={isLogged ? <Projects /> : <Navigate to="/login" />} />
        <Route path='*' element={<h1>404 Not Found</h1>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
