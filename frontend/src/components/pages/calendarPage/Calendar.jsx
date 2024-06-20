import React, { useEffect } from 'react'
import Nav from '../../nav/Nav'
import { useLanguage } from '../../languages/LanguageContext'

const Calendar = () => {
    const { lang } = useLanguage();
    useEffect(() => {
        document.title = 'Calendar - HR App'
    }, [])
  return (
    <div>
        <Nav />
        <h2>{lang.calendar.title}</h2>
    </div>
  )
}

export default Calendar