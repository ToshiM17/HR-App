import React, { useEffect } from 'react'
import Nav from './nav/Nav'
import { useLanguage } from './languages/LanguageContext'

const Projects = () => {
    const { lang } = useLanguage();
    useEffect(() => {
        document.title = 'Projects - HR App'
    }, [])
  return (
    <div>
        <Nav />
        <h2>{lang.projects.title}</h2>
    </div>
  )
}

export default Projects