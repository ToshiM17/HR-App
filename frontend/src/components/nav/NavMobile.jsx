import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars, faXmark, faRightFromBracket, faHouseChimney, faCalendarDays, faListCheck } from '@fortawesome/free-solid-svg-icons'

const NavMobile = () => {
    const navigate = useNavigate();
    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login');
        window.location.reload();
    };
    const [isOpen, setIsOpen] = useState(false);
  return (
    <nav>
        <button className='menu' onClick={() => setIsOpen(true)}><FontAwesomeIcon icon={faBars} /></button>
        {isOpen && (
            <div className='nav'>
                <button className='menu' onClick={() => setIsOpen(false)}><FontAwesomeIcon icon={faXmark} /></button>
                <Link to='/home' className='link'><FontAwesomeIcon icon={faHouseChimney} className='icon' />Home</Link>
                <Link to='/calendar' className='link'><FontAwesomeIcon icon={faCalendarDays} className='icon' />Calendar</Link>
                <Link to='/projects' className='link'><FontAwesomeIcon icon={faListCheck} className='icon' />Projects</Link>
                <button className='link' onClick={handleLogout}><FontAwesomeIcon icon={faRightFromBracket} className='icon' />Logout</button>
            </div>
        )}
    </nav>
  )
}

export default NavMobile