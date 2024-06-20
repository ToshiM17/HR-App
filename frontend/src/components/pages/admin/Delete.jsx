import React from 'react';
import axios from 'axios';
import { useLanguage } from '../../languages/LanguageContext';

const Delete = ({ setIsDeleted, username, refreshUsers }) => {
  const { lang } = useLanguage();

  const handleDelete = async () => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`/api/delete_user/${username}/`, {
        headers: {
          Authorization: `Token ${token}`,
        },
      });
      refreshUsers();
      setIsDeleted(false);
    } catch (error) {
      console.error('Failed to delete user', error);
    }
  };

  const handlePopupClick = (e) => {
    if (e.target.classList.contains('popUpBox')) {
        setIsDeleted(false);
    }
}

  return (
    <div className="popUpBox" onClick={handlePopupClick}>
      <div className="popUpInfo">
        <h2>{lang.users.deleteInfo}</h2>
        <button onClick={handleDelete} className='close'>{lang.globals.yes}</button>
        <button onClick={() => setIsDeleted(false)}>{lang.globals.no}</button>
      </div>
    </div>
  );
};

export default Delete;