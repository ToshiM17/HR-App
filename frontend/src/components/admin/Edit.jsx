import React from 'react'
import { useLanguage } from '../languages/LanguageContext';

const Edit = ({ setIsEdited }) => {
    const { lang } = useLanguage();
  return (
    <div className="popUpBox">
        <div className="popUpInfo">
            <h2>Test</h2>
            <button onClick={() => setIsEdited(false)} className='close'>{lang.globals.cancel}</button>
        </div>
    </div>
  )
}

export default Edit