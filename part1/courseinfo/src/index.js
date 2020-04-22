import React, { useState } from 'react'
import ReactDOM from 'react-dom'

 
const Header = (props) => {
  console.log(props)
  return (
    <h1>{props.course}</h1>
  )
}

const Part = (props) => {
  console.log(props)
  return (
    <p>
      {props.partName} {props.exerciseAmount}
    </p>
  )
}

const Content = (props) => {
  return (
    <div>
      <Part partName = {props.parts[0].name} exerciseAmount = {props.parts[0].exercises}/>
      <Part partName = {props.parts[1].name} exerciseAmount = {props.parts[1].exercises}/>
      <Part partName = {props.parts[2].name} exerciseAmount = {props.parts[2].exercises}/>
    </div>
  )
}

const Total = (props) => {
  console.log(props)
  return (
    <p>
      {'Number of exercises'} {props.parts[0].exercises + props.parts[1].exercises + props.parts[2].exercises}
    </p>
  )
}


const App = () => {

  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }

  return (
    <div>
      <Header course = {course.name}/>
      <Content parts = {course.parts}/>
      <Total parts = {course.parts} />
    </div>
  )
}



ReactDOM.render(<App />, document.getElementById('root'))




































