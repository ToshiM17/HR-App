import React, { useEffect } from 'react';
import Nav from '../nav/Nav';
import { useLanguage } from '../languages/LanguageContext';

const Home = () => {
    const { lang } = useLanguage();
    useEffect(() => {
        document.title = 'Home - HR App'
    }, [])
    return (
        <div>
            <Nav />
            <h2>{lang.home.title}</h2>
        </div>
    );
};

export default Home;
