import React, { useState } from 'react';
import { useLanguage } from '../languages/LanguageContext';

const Edit = ({ setIsEdited, user }) => {
    const { lang } = useLanguage();
    const [firstName, setFirstName] = useState(user.first_name);
    const [lastName, setLastName] = useState(user.last_name);
    const [email, setEmail] = useState(user.email);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsEdited(false);
    }

    const handlePopupClick = (e) => {
        if (e.target.classList.contains('popUpBox')) {
            setIsEdited(false);
        }
    }

    return (
        <div className="popUpBox" onClick={handlePopupClick}>
            <div className="popUpInfo">
                <h2>{lang.users.edit}</h2>
                <form onSubmit={handleSubmit}>
                    <div className='column'>
                        <label>{lang.users.name}:</label>
                        <input 
                            type="text" 
                            value={firstName} 
                            onChange={(e) => setFirstName(e.target.value)} 
                        />
                    </div>
                    <div className='column'>
                        <label>{lang.users.surname}:</label>
                        <input 
                            type="text" 
                            value={lastName} 
                            onChange={(e) => setLastName(e.target.value)} 
                        />
                    </div>
                    <div className='column'>
                        <label>{lang.users.email}:</label>
                        <input 
                            type="email" 
                            value={email} 
                            onChange={(e) => setEmail(e.target.value)} 
                        />
                    </div>
                    <button type="submit">{lang.globals.save}</button>
                    <button type="button" onClick={() => setIsEdited(false)} className='close'>{lang.globals.cancel}</button>
                </form>
            </div>
        </div>
    );
}

export default Edit;
