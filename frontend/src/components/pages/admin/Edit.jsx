import React, { useState } from 'react';
import axios from 'axios';
import { useLanguage } from '../../languages/LanguageContext';

const Edit = ({ setIsEdited, user, refreshUsers }) => {
  const { lang } = useLanguage();
  const [formData, setFormData] = useState({
    username: user.username,
    email: user.email,
    first_name: user.first_name,
    last_name: user.last_name,
    is_superuser: user.is_superuser,
    is_staff: user.is_staff,
    is_active: user.is_active,
    group_name: user.group_name
  });
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    try {
      await axios.put(`/api/edit_user/${user.id}`, formData, {
        headers: {
          Authorization: `Token ${token}`,
        },
      });
      setMessage(lang.users.editSuccess);
      setTimeout(() => {
        setIsEdited(false);
        refreshUsers();
      }, 2000);
    } catch (error) {
      setMessage(lang.users.editError);
    }
  };

  const handlePopupClick = (e) => {
    if (e.target.classList.contains('popUpBox')) {
      setIsEdited(false);
    }
  };

    return (
        <div className="popUpBox" onClick={handlePopupClick}>
            <div className="popUpInfo">
                <h2>{lang.users.edit}</h2>
                {message && <p>{message}</p>}
                <form onSubmit={handleSubmit}>
                    <div className='column'>
                        <label>{lang.users.username}:</label>
                        <input 
                            type="text" 
                            name="username"
                            value={formData.username} 
                            onChange={handleChange}
                        />
                    </div>
                    <div className='column'>
                        <label>{lang.users.email}:</label>
                        <input 
                            type="email" 
                            name="email"
                            value={formData.email} 
                            onChange={handleChange}
                        />
                    </div>
                    <div className='column'>
                        <label>{lang.users.name}:</label>
                        <input 
                            type="text"
                            name="first_name" 
                            value={formData.first_name} 
                            onChange={handleChange}
                        />
                    </div>
                    <div className='column'>
                        <label>{lang.users.surname}:</label>
                        <input 
                            type="text" 
                            name="last_name"
                            value={formData.last_name} 
                            onChange={handleChange}
                        />
                    </div>
                    <div className='column'>
                        <label>{lang.users.active}:</label>
                        <select 
                            name="is_active"
                            value={formData.is_active} 
                            onChange={handleChange}
                        >
                            <option value="true">{lang.globals.yes}</option>
                            <option value="false">{lang.globals.no}</option>
                        </select>
                    </div>
                    <div className='column'>
                        <label>{lang.users.group}:</label>
                        <select 
                            name="group_name"
                            value={formData.group_name} 
                            onChange={handleChange}
                        >
                            <option value="users">{lang.users.users}</option>
                            <option value="admins">{lang.users.admins}</option>
                        </select>
                    </div>
                    <button type="submit">{lang.globals.save}</button>
                    <button type="button" onClick={() => setIsEdited(false)} className='close'>{lang.globals.cancel}</button>
                </form>
            </div>
        </div>
    );
}

export default Edit;
