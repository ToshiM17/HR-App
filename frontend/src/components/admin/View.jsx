import React from 'react';
import { useLanguage } from '../languages/LanguageContext';

const View = ({ setIsViewed, user }) => {
    const { lang } = useLanguage();
    return (
        <div className="popUpBox">
            <div className="popUpInfo">
                <div className="text">
                    <div className="textBox">
                        <h3 className='left'>{lang.users.username}:</h3><h3>{user.username}</h3>
                    </div>
                    <div className="textBox">
                        <h3 className='left'>{lang.users.name}:</h3><h3>{user.first_name}</h3>
                    </div>
                    <div className="textBox">
                        <h3 className='left'>{lang.users.surname}:</h3><h3>{user.last_name}</h3>
                    </div>
                    <div className="textBox">
                        <h3 className='left'>{lang.users.email}:</h3><h3>{user.email}</h3>
                    </div>
                    <div className="textBox">
                        <h3 className='left'>{lang.users.group}:</h3><h3>{user.group_name}</h3>
                    </div>
                </div>
                <button onClick={() => setIsViewed(false)} className='close'>{lang.globals.cancel}</button>
            </div>
        </div>
    );
}

export default View;
