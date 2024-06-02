import React from 'react'
import { useLanguage } from '../languages/LanguageContext';

const Delete = ({ setIsDeleted }) => {
    const { lang } = useLanguage();
  return (
    <div className="popUpBox">
        <div className="popUpInfo">
            <h2>{lang.users.deleteInfo}</h2>
            <button onClick={() => setIsDeleted(false)} className='close'>{lang.globals.yes}</button>
            <button onClick={() => setIsDeleted(false)}>{lang.globals.no}</button>
        </div>
    </div>
  )
}

export default Delete