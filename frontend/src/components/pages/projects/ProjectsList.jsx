import React from 'react'
import { useLanguage } from '../../languages/LanguageContext'
import projects from '../../styles/projects.module.sass'

const ProjectsList = ({ setIsProject }) => {
    const { lang } = useLanguage();
    const handleProject = () => {
        console.log('Project clicked');
        setIsProject(true);
    }
  return (
    <>
        <h1>{lang.projects.title}</h1>
        <main className={projects.projects}>
            <div className={projects.projectBox} onClick={handleProject}>
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
    </>
  )
}

export default ProjectsList