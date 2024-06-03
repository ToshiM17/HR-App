import React, { useEffect, useState } from 'react'
import Nav from '../nav/Nav';
import { useLanguage } from '../languages/LanguageContext';
import users from '../styles/users.module.sass';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserGroup, faUserShield } from '@fortawesome/free-solid-svg-icons';
import AddUser from './AddUser';
import View from './View';
import Edit from './Edit';
import Delete from './Delete';

const Users = () => {
    const { lang } = useLanguage();
    const [userList, setUserList] = useState([]);
    useEffect(() => {
        document.title = 'Users - HR App'

        const fetchUsers = async () => {
            try {
              const token = localStorage.getItem('token');
              const response = await axios.post('/api/get_users/', {}, {
                headers: {
                  Authorization: `Token ${token}`
                }
              });
              setUserList(response.data);
            } catch (error) {
                console.error('Failed to fetch users', error);
                localStorage.removeItem('token');
                localStorage.removeItem('group');
                window.location.reload();
            }
          };
      
          fetchUsers();
    }, [])
    const [isAdded, setIsAdded] = useState(false);
    const [isViewed, setIsViewed] = useState(false);
    const [isEdited, setIsEdited] = useState(false);
    const [isDeleted, setIsDeleted] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);
    const handleView = (user) => {
        setSelectedUser(user);
        setIsViewed(true);
    };
    const handleEdit = (user) => {
        setSelectedUser(user);
        setIsEdited(true);
    }
    const handleDelete = (user) => {
        setSelectedUser(user);
        setIsDeleted(true);
    }
    return (
        <>
            <Nav />
            <main>
                <div className={users.users}>
                    <div className={users.usersHeader}>
                        <h1>{lang.users.title}</h1>
                        <button onClick={() => setIsAdded(true)} className={users.addUser}>{lang.users.add}</button>
                        {isAdded && <AddUser setIsAdded={setIsAdded} />}
                    </div>
                    <div className={users.usersList}>
                        {userList.map((user) => (
                            <div key={user.username} className={users.user}>
                                <div className={users.name}>
                                    {user.group_name === 'admins' ? (<FontAwesomeIcon icon={faUserShield} size="lg" className={users.icon} />) : (<FontAwesomeIcon icon={faUserGroup} size="lg" className={users.icon} />)}
                                    <h3>{user.first_name}</h3>
                                    <h3>{user.last_name}</h3>
                                </div>
                                <h3 className={users.email}>{user.email}</h3>
                                <div className={users.btns}>
                                    <button onClick={() => handleView(user)}>{lang.users.view}</button>
                                    <button onClick={() => handleEdit(user)}>{lang.users.edit}</button>
                                    <button  onClick={() => handleDelete(user)} className={users.delete}>{lang.users.delete}</button>
                                </div>
                            </div>
                            ))}
                            {isViewed && <View setIsViewed={setIsViewed} user={selectedUser} />}
                            {isEdited && <Edit setIsEdited={setIsEdited} user={selectedUser} />}
                            {isDeleted && <Delete setIsDeleted={setIsDeleted} user={selectedUser} />}
                    </div>
                </div>
            </main>
        </>
    )
}

export default Users