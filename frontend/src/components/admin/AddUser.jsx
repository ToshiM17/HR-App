import React, { useState } from 'react';
import axios from 'axios';
import { useLanguage } from '../languages/LanguageContext';

const AddUser = ({ setIsAdded, refreshUsers }) => {
  const { lang } = useLanguage();
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    first_name: '',
    last_name: '',
    is_superuser: false,
    is_staff: false,
    is_active: true,
    group_name: 'users',
  });
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      await axios.post('/api/create_user/', formData, {
        headers: {
          Authorization: `Token ${token}`,
        },
      });
      setMessage(lang.users.addSuccess);
      refreshUsers();
      setTimeout(() => {
        setIsAdded(false);
      }, 2000);
    } catch (error) {
      setMessage(lang.users.addError);
    }
  };

  return (
    <div className="popUpBox">
      <div className="popUpInfo">
        <h2>{lang.users.addUser}</h2>
        {message && <p>{message}</p>}
        <form onSubmit={handleSubmit}>
        <div className="column">
            <label>{lang.users.username}</label>
            <input type="text" name="username" value={formData.username} onChange={handleChange} required />
          </div>
          <div className="column">
            <label>{lang.users.email}</label>
            <input type="email" name="email" value={formData.email} onChange={handleChange} required />
          </div>
          <div className="column">
            <label>{lang.users.password}</label>
            <input type="password" name="password" value={formData.password} onChange={handleChange} required />
          </div>
          <div className="column">
            <label>{lang.users.name}</label>
            <input type="text" name="first_name" value={formData.first_name} onChange={handleChange} required />
          </div>
          <div className="column">
            <label>{lang.users.surname}</label>
            <input type="text" name="last_name" value={formData.last_name} onChange={handleChange} required />
          </div>
          <div className="column">
            <label>{lang.users.group}</label>
            <select name="group_name" value={formData.group_name} onChange={handleChange}>
              <option value="users">Users</option>
              <option value="admins">Admins</option>
            </select>
          </div>
          <button type="submit">{lang.globals.save}</button>
          <button type="button" onClick={() => setIsAdded(false)} className="close">
            {lang.globals.cancel}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddUser;
