import React from 'react'

const Total = ({ parts }) => {

    const numberOfExercises = parts.map(part => part.exercises);
    const reducer = (accumulator, currentValue) => accumulator + currentValue;
    const sum = numberOfExercises.reduce(reducer);

    return(
      <p>Number of exercises {sum}</p>
    ) 
  }

export default Total