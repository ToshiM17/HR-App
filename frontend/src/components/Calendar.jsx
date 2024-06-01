import React, { useEffect } from 'react'
import Nav from './nav/Nav'

const Calendar = () => {
    useEffect(() => {
        document.title = 'Calendar - HR App'
    }, [])
  return (
    <div>
        <Nav />
        <h2>Calendar</h2>
    </div>
  )
}

export default Calendar