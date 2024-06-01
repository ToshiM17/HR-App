import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { useLanguage } from '../languages/LanguageContext'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHouseChimney, faCalendarDays, faListCheck, faRightFromBracket, faGlobe } from '@fortawesome/free-solid-svg-icons'

const NavDesktop = () => {
    const { lang, changeLanguage } = useLanguage();
    const [ isLang, setIsLang ] = useState(false);
    const navigate = useNavigate();
    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login');
        window.location.reload();
    };
  return (
    <nav>    
        <Link to='/home' className='link'><FontAwesomeIcon icon={faHouseChimney} className='icon' />{lang.nav.home}</Link>
        <Link to='/calendar' className='link'><FontAwesomeIcon icon={faCalendarDays} className='icon' />{lang.nav.calendar}</Link>
        <Link to='/projects' className='link'><FontAwesomeIcon icon={faListCheck} className='icon' />{lang.nav.projects}</Link>
        <button onClick={() => setIsLang(true)} className='link'><FontAwesomeIcon icon={faGlobe} />{lang.nav.language}</button>
        <button className='logout' onClick={handleLogout}><FontAwesomeIcon icon={faRightFromBracket} className='icon' />{lang.nav.logout}</button>
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

export default NavDesktop