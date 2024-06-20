import React from 'react'

const Project = ({ setIsProject }) => {
    const handleProject = () => {
        setIsProject(false);
    }
  return (
    <div onClick={handleProject}>Project</div>
  )
}

export default Project