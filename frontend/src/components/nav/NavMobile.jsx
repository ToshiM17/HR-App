import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars, faXmark, faRightFromBracket, faHouseChimney, faCalendarDays, faListCheck, faGlobe } from '@fortawesome/free-solid-svg-icons'
import { useLanguage } from '../languages/LanguageContext'
import axios from 'axios'

const NavMobile = () => {
    const { lang, changeLanguage } = useLanguage();
    const [ isLang, setIsLang ] = useState(false);
    const navigate = useNavigate();
    const handleLogout = async () => {
        const token = localStorage.getItem('token');
        if (token) {
          try {
            await axios.post('/api/delete_token/', {}, {
              headers: {
                'Authorization': `Token ${token}`
              }
            });
            localStorage.removeItem('token');
            navigate('/login');
            window.location.reload();
          } catch (error) {
            console.error('Failed to delete token:', error);
          }
        }
      };
    const [isOpen, setIsOpen] = useState(false);
  return (
    <nav>
        <button className='menu' onClick={() => setIsOpen(true)}><FontAwesomeIcon icon={faBars} /></button>
        {isOpen && (
            <div className='nav'>
                <button className='menu' onClick={() => setIsOpen(false)}><FontAwesomeIcon icon={faXmark} /></button>
                <Link to='/home' className='link'><FontAwesomeIcon icon={faHouseChimney} size="lg" className='icon' />{lang.nav.home}</Link>
                <Link to='/calendar' className='link'><FontAwesomeIcon icon={faCalendarDays} size="lg" className='icon' />{lang.nav.calendar}</Link>
                <Link to='/projects' className='link'><FontAwesomeIcon icon={faListCheck} size="lg"  className='icon' />{lang.nav.projects}</Link>
                <div onClick={() => setIsLang(true)} className='link'><FontAwesomeIcon icon={faGlobe} size="lg" className='icon' />{lang.nav.language}</div>
                <div className='link' onClick={handleLogout}><FontAwesomeIcon icon={faRightFromBracket} size="lg" className='icon' />{lang.nav.logout}</div>
            </div>
        )}
        {isLang && (
            <div className='popUpBox'>
                <div className="popUpInfo">
                    <button onClick={() => {changeLanguage('en'); setIsLang(false);}}>{lang.nav.en}</button>
                    <button onClick={() => {changeLanguage('pl'); setIsLang(false);}}>{lang.nav.pl}</button>
                    <button onClick={() => setIsLang(false)} className="close">Close</button>
                </div>
            </div>
        )}
    </nav>
  )
}

export default NavMobile