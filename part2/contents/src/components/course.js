import React from 'react'
import Header from './course/header'
import Content from './course/content'
import Total from './course/total'

const Course = ({ courseinfo }) => {
  const partsArray = courseinfo.parts.map(element => element);

    return (
      <div>
        <Header course={courseinfo} />
        <Content parts={partsArray} />
        <Total parts={partsArray} />
    </div>
    )
  }

export default Course