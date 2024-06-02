import React from 'react'
import { useLanguage } from '../languages/LanguageContext';

const AddUser = ({ setIsAdded }) => {
    const { lang } = useLanguage();
  return (
    <div className="popUpBox">
        <div className="popUpInfo">
            <h2>Test</h2>
            <button onClick={() => setIsAdded(false)} className='close'>{lang.globals.cancel}</button>
        </div>
    </div>
  )
}

export default AddUser