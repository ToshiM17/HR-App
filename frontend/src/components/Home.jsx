import React, { useEffect } from 'react';
import Nav from './nav/Nav';

const Home = () => {
    useEffect(() => {
        document.title = 'Home - HR App'
    }, [])
    return (
        <div>
            <Nav />
            <h2>Home</h2>
        </div>
    );
};

export default Home;
