import React, { useEffect, useState } from 'react'
import Nav from '../../nav/Nav'
import Project from './Project'
import ProjectsList from './ProjectsList';

const Projects = () => {
    const [isProject, setIsProject] = useState(false);
    useEffect(() => {
        document.title = 'Projects - HR App'
    }, [])
  return (
    <div>
        <Nav />
        {isProject ? <Project setIsProject={setIsProject} /> : <ProjectsList setIsProject={setIsProject} />}
    </div>
  )
}

export default Projects