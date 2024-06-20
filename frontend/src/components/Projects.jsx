import React, { useEffect } from 'react'
import Nav from './nav/Nav'
import { useLanguage } from './languages/LanguageContext'
import projects from './styles/projects.module.sass'

const Projects = () => {
    const { lang } = useLanguage();
    useEffect(() => {
        document.title = 'Projects - HR App'
    }, [])
  return (
    <div>
        <Nav />
        <h1>{lang.projects.title}</h1>
        <main className={projects.projects}>
            <div className={projects.projectBox}>
                <div className={projects.projectHeader}>
                    <h2>{lang.projects.title}</h2>
                </div>
                    <p>Opis</p>
                    <p>{lang.projects.liders} Username</p>
                    <p>{lang.projects.date} Data</p>
            </div>
        {Array(60).fill().map((_, index) => ( // For testing purposes
          <div className={projects.projectBox}>
            <div className={projects.projectHeader}>
                <h2>{lang.projects.title}</h2>
            </div>
                <p>{lang.projects.description}Opis</p>
                <p>{lang.projects.liders} Username</p>
                <p>{lang.projects.date} Data</p>
          </div>
        ))}
        </main>
    </div>
  )
}

export default Projects