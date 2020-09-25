require('dotenv').config()
const express = require('express')
const app = express()
const cors = require('cors')
const morgan = require('morgan')
const mongoose = require('mongoose')
const Person = require('./models/person')

app.use(morgan('tiny'))
app.use(cors())
app.use(express.json())
app.use(express.static('build'))

// app.get('/', (req, res) => {
//   res.send('<h1>Hello World!</h1>')
// })

app.get('/api/persons', (req, res) => {
  Person.find({}).then(persons => {
    res.json(persons.map(person => person.toJSON()))
  })
})

app.get('/info', (req, res) => {
  Person.find().estimatedDocumentCount().then(numberOfPeople => {
    res.send(
      `<p>Phonebook has info for ${numberOfPeople} people!</p>
         <br> ${new Date()}`
    )
  })
})

app.get('/api/persons/:id', (request, response) => {
  Person.findById(request.params.id).then(retrievedPerson => {
    response.json(retrievedPerson)
  })
})

app.delete('/api/persons/:id', (request, response, next) => {
  Person.findByIdAndDelete(request.params.id)
    .then(result => {
      response.status(204).end()
    })
    .catch(error => next(error))
})

app.put('/api/persons/:id', (request, response, next) => {
  const body = request.body

  const person = {
    name: body.name,
    number: body.number,
  }

  Person.findByIdAndUpdate(request.params.id, person, { new: true })
    .then(updatedPerson => {
      response.json(updatedPerson)
    })
    .catch(error => next(error))
})


app.post('/api/persons', (request, response, next) => {
  const body = request.body;

  if (body.name === undefined && body.number === undefined) {
    console.log(body.name, body.number)
    return response.status(400).json({ error: 'name and number are missing' })
  }

  const newPerson = new Person({ //constructs instance of mongoose Person model
    name: body.name,
    number: body.number,
  })

  console.log('new Person instance', newPerson.name, newPerson.number)

  newPerson.save()
    .then(savedPerson => savedPerson.toJSON())
    .then(savedAndFormattedPerson => response.json(savedAndFormattedPerson))
    .catch(error => next(error))
})

const unknownEndPoint = (request, response) => {
  return response.status(404).send({ error: 'Unknown Endpoint' })
}

app.use(unknownEndPoint)

const errorHandler = (error, request, response, next) => {
  console.log('Error Message', error.message)
  console.log('Name Error: ', error.errors['name'])
  console.log('Number Error: ', error.errors['number'])

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  }
  if (error.name === 'ValidationError') {
    return response.status(400).send(error)
  }

  next(error)
}

app.use(errorHandler)

// closes available connections before process termination
process.on('beforeExit', () => {
  mongoose.connection.close()
  console.log('Connection will close due to process termination')
})

process.on('uncaughtExceptionMonitor', (err, origin) => {
  mongoose.connection.close()
  console.log('Connection has closed due to an uncaught exception')
})

process.on('SIGINT', () => {
  mongoose.connection.close()
  console.log('Connection has closed due to receiving SIGINT')
});

const PORT = process.env.PORT //PORT value found in .env file
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})