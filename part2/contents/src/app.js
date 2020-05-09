import React from 'react'
import Course from './components/course'

const App = ({ courses }) => {
  
    return (
      <div>
        {courses.map(course =>
          <Course key={course.id} courseinfo={course} />
        )}
      </div>
    )
  }

  export default App