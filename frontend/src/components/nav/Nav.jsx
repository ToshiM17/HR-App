import React, { useEffect, useState } from 'react'
import NavDesktop from './NavDesktop'
import NavMobile from './NavMobile'

const Nav = () => {
    const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);
    useEffect(() => {
        const handleResize = () => {
          setIsMobile(window.innerWidth < 1024);
        };
        window.addEventListener('resize', handleResize);
        return () => {
          window.removeEventListener('resize', handleResize);
        };
      }, []);
    return (
        <header>
            <h1>HR App</h1>
            {isMobile ? <NavMobile /> : <NavDesktop />}
        </header>
    )
}

export default Nav