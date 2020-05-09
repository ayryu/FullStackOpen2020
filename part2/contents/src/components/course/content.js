import React from 'react'
import Part from './part'

const Content = ({ parts }) => {
  console.log('Content - partsArray ', parts)
    return (
      <div>
        {parts.map(part =>
          <Part key={part.id} name={part.name} exercises={part.exercises} />
        )}
      </div>
    )
  }

export default Content