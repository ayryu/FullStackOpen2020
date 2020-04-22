import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Statistic = ({text, value}) => {
  return (
    <p>{text}{value}</p>
  )
}

const Button = ({handleClick, text}) => {
  return (
    <button onClick={handleClick}>
    {text}
    </button>
  )
}

const Statistics = ({values}) => {
  if(values.totalValue === 0) {
    return (
      <p> No Feedback Given </p>
    )
  }
  return (
    <div>
      
    <table>
      <tbody>
        <tr>
          <td><Statistic text = "Good: " /></td>
          <td><Statistic value = {values.good}/></td>
        </tr>
        <tr>
          <td><Statistic text = "Neutral: " /></td>
          <td><Statistic value = {values.neutral}/></td>
        </tr>
        <tr>
          <td><Statistic text = "Bad: " /></td>
          <td><Statistic value = {values.bad}/></td>
        </tr>
        <tr>
          <td><Statistic text = "Total: " /></td>
          <td><Statistic value = {values.totalValue}/></td>
        </tr>
        <tr>
          <td><Statistic text = "Average Score: " /></td>
          <td><Statistic value = {values.averageValue}/></td>
        </tr>
        <tr>
          <td><Statistic text = "Positive Feedback: " /></td>
          <td><Statistic value = {values.positive}/></td>
        </tr>
      </tbody>
    </table>

    </div>
  )
}

const App = () => {

  const [presses, setPresses] = useState({
    good: 0, neutral: 0, bad: 0
  })

  const total = presses.good + presses.neutral + presses.bad
  const average = (presses.good - presses.bad) / total
  const positiveFeedback = ((presses.good / total) * 100) + "%"

  const values = {
    good: presses.good,
    neutral: presses.neutral,
    bad: presses.bad, 
    totalValue: total,
    averageValue: average,
    positive: positiveFeedback
  }
  
  const increaseGoodCount = () => {
    setPresses({...presses, good: presses.good + 1})
  }
    
  const increaseNeutralCount = () => {
    setPresses({...presses, neutral: presses.neutral + 1}) 
  }

  const increaseBadCount = () => {
    setPresses({...presses, bad: presses.bad + 1})
  }

  return (
    <div>
      <h1>Give Feedback</h1>

      <Button handleClick={increaseGoodCount} text = "Good" />
      <Button handleClick={increaseNeutralCount}  text = "Neutral"/>
      <Button handleClick={increaseBadCount}  text = "Bad"/>

      <h1>Statistics</h1>
      
      <Statistics values = {values}/>

    </div>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)