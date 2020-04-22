import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = (props) => {
  return (
    <button onClick = {props.handleClick}>{props.text}</button>
  )
}

const App = (props) => {
  const [selected, setSelected] = useState(0)
  const [mostPopularQuote, setMostPopularQuote] = useState(0)
  const [votes, setVotes] = useState([0, 0, 0, 0, 0, 0])

  const addVote = (quoteIndexPosition) => {
    const arrayCopy = [...votes]
    arrayCopy[quoteIndexPosition] += 1
    setVotes(arrayCopy)
    console.log(arrayCopy)
    findHighestVoteCount(arrayCopy)
  }

  const findHighestVoteCount = (arrCopy) => {
    let indexPosition = 0
    //a
    for(let i = 0; i < votes.length; i++) {
      if(arrCopy[i] >= arrCopy[indexPosition]) {
        indexPosition = i
      }
    }
    setMostPopularQuote(indexPosition)
    console.log("Index position: ", indexPosition)
  }

  function extractRandomQuote(max) {
    setSelected(Math.floor(Math.random() * Math.floor(max)))
  }

  return (
    <div>
      {props.anecdotes[selected]}
      <p>This quote has {votes[selected]} votes</p>
      <p></p>
      <Button text = "Vote!" handleClick = {() => addVote(selected)}/>
      <Button text = "Next Anecdote!" handleClick = {() => extractRandomQuote(6)}/>
      
      <p>
        {props.anecdotes[mostPopularQuote]}
      </p>
      <p>The most popular quote has {votes[mostPopularQuote]} votes</p>
    </div>
  )
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)

