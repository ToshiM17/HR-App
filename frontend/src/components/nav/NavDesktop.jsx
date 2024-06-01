import React from 'react'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'

const NavDesktop = () => {
    const navigate = useNavigate();
    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login');
        window.location.reload();
    };
  return (
    <nav>    
        <Link to='/home' className='link'>Home</Link>
        <Link to='/calendar' className='link'>Calendar</Link>
        <Link to='/projects' className='link'>Projects</Link>
        <button className='logout' onClick={handleLogout}>Logout</button>
    </nav>
  )
}

export default NavDesktop