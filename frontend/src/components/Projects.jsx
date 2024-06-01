import React, { useEffect } from 'react'
import Nav from './nav/Nav'

const Projects = () => {
    useEffect(() => {
        document.title = 'Projects - HR App'
    }, [])
  return (
    <div>
        <Nav />
        <h2>Projects</h2>
    </div>
  )
}

export default Projects