const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator');

mongoose.set('useFindAndModify', false)
mongoose.set('useCreateIndex', true);
const url = process.env.MONGODB_URI
console.log('connecting to', url)

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(result => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connecting to MongoDB:', error.message)
  })

  const personSchema = new mongoose.Schema({
    name: {
      type: String,
      minlength: [3, 'The name must contain at least 3 letters'],
      unique: true,
      uniqueCaseInsensitive: true
    },
    number: {
      type: String,
      minlength: [8, 'The number must contain at least 8 characters']
    },
  })

  personSchema.plugin(uniqueValidator);

// the _id of Mongoose objects is an Object and not a String, so we convert it using toString()
personSchema.set('toJSON', {
    transform: (document, returnedObject) => {
      returnedObject.id = returnedObject._id.toString()
      delete returnedObject._id
      delete returnedObject.__v
    }
  })

module.exports = mongoose.model('Person', personSchema)