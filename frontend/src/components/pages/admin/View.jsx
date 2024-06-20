import React from 'react';
import { useLanguage } from '../../languages/LanguageContext';

const View = ({ setIsViewed, user }) => {
    const { lang } = useLanguage();
    const handlePopupClick = (e) => {
        if (e.target.classList.contains('popUpBox')) {
            setIsViewed(false);
        }
    }
    return (
        <div className="popUpBox" onClick={handlePopupClick}>
            <div className="popUpInfo">
                <h2>{lang.users.view}</h2>
                <div className="text">
                    <div className="textBox">
                        <p className='left'>{lang.users.username}:</p><p>{user.username}</p>
                    </div>
                    <div className="textBox">
                        <p className='left'>{lang.users.name}:</p><p>{user.first_name}</p>
                    </div>
                    <div className="textBox">
                        <p className='left'>{lang.users.surname}:</p><p>{user.last_name}</p>
                    </div>
                    <div className="textBox">
                        <p className='left'>{lang.users.email}:</p><p>{user.email}</p>
                    </div>
                    <div className="textBox">
                        <p className='left'>{lang.users.group}:</p><p>{user.group_name}</p>
                    </div>
                </div>
                <button onClick={() => setIsViewed(false)} className='close'>{lang.globals.cancel}</button>
            </div>
        </div>
    );
}

export default View;
