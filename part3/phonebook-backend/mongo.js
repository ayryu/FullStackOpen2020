const mongoose = require('mongoose')

if (process.argv.length < 3) {
    console.log('Please provide the password as an argument: node mongo.js <password>')
    process.exit(1)
  }

  const password = process.argv[2]
  const name = process.argv[3]
  const number = process.argv[4]

  const personSchema = new mongoose.Schema({
    name: String,
    number: String,
  })
  
  const Person = mongoose.model('Person', personSchema)
  
  const person = new Person({
      name: name,
      number: number,
  })

if (process.argv.length === 3) {
    console.log('phonebook:')
    Person.find({}).then(result => {
        result.forEach(person => {
          console.log('%s %s', person.name, person.number)
        })
        mongoose.connection.close()
      })
}

const url =
  `mongodb+srv://fullstack:${password}@cluster0.a8xtw.mongodb.net/phonebook?retryWrites=true&w=majority`

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })

if (process.argv.length > 3 && process.argv[4] !== undefined) {
    person.save().then(result => {
        console.log('added %s number %s to phonebook', name, number)
        mongoose.connection.close()
      })
  }

  if (process.argv.length > 3 && process.argv[4] === undefined) {
      console.log('Please provide both a name and number as arguments, respectively')
      process.exit(1)
  }