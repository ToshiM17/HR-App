import React, { useEffect } from 'react'
import Nav from './nav/Nav';
import { useLanguage } from './languages/LanguageContext';
import users from './styles/users.module.sass';

const Users = () => {
    const { lang } = useLanguage();
    useEffect(() => {
        document.title = 'Users - HR App'
    }, [])
    return (
        <>
            <Nav />
            <main>
                <div className={users.users}>
                    <div className={users.usersHeader}>
                        <h1>{lang.users.title}</h1>
                        <button className={users.addUser}>{lang.users.add}</button>
                    </div>
                    <div className={users.usersList}>
                        <div className={users.user}>
                            <h2>{lang.users.name}</h2>
                            <h2>{lang.users.surname}</h2>
                            <h2>{lang.users.group}</h2>
                            <div className={users.btns}>
                                <button>{lang.users.edit}</button>
                                <button className={users.delete}>{lang.users.delete}</button>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </>
    )
}

export default Users