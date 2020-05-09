import React, { useState, useEffect } from 'react'
import Person from './components/person'
import PhoneBook from './components/phonebook'
import axios from 'axios'
import numbersService from './services/numbers'
import Notification from './components/notification'

//hi

const App = () => {
    const [ people, setPeople ] = useState([]) //state of info of existing people
    const [ newPerson, setNewPerson ] = useState({ //state of value in input element
      name: '',
      number: '',
      id: ''
    })
    const [ searchedName, setSearchedName ] = useState('')
    const [ notifMessage, setNotifMessage ] = useState(null)

    const hook = () => {
      numbersService
        .getAll()
        .then(storedPhoneNumbers => {
          setPeople(storedPhoneNumbers)
        })
    }
    
    useEffect(hook, [])
    console.log('People array: ', people)
    
    const addPersonInfo = (event) => {
      event.preventDefault()

      const result = people.filter(person => person.name === newPerson.name)
      const resetValue = {
        name: '',
        number: '',
        id: ''
      }

      console.log('People array: ', people)
      console.log('Result: ', result)

      if(result.length === 1) { //if new Person already exists in People array, update the existing 
        const updatedEntry = {
          name: result[0].name,
          number: newPerson.number,
          id: result[0].name,
        }

        if(window.confirm(`${newPerson.name} has already been added to the phonebook, would you like to replace their existing number?`)) {
          numbersService
              .update(updatedEntry.id, updatedEntry)
                .then(returnedPersonInfo => {
                  setPeople(people.map(person => person.id !== returnedPersonInfo.id ? person : returnedPersonInfo))
                  setNotifMessage(
                    `${returnedPersonInfo.name}'s information has been updated!`
                  )
                  setNewPerson(resetValue)
                  console.log('Value of returnedPersonInfo: ', returnedPersonInfo)
                })
                .catch(error => {
                  alert(
                    `${updatedEntry.name} has already been removed from the server`
                  )
                  setPeople(people.filter(person => person.id !== result[0].id))
                  setNewPerson(resetValue)
                })
          }
      } if(result.length === 0) {
          event.preventDefault()

          const personObject = {
          name: newPerson.name,
          number: newPerson.number,
          id: newPerson.name,
          }

          numbersService            
            .create(personObject)       //send POST request with newPerson 
            .then(singleReturnedPerson => {   
              setPeople(people.concat(singleReturnedPerson))   //update People array with newPerson
              setNewPerson(resetValue)    //empty the input element 
              setNotifMessage(
                `${singleReturnedPerson.name}'s information has been added to the phonebook!`
              )
            })
            
        }
    }

    const deletePersonInfo = id => {
      const targetPerson = people.find(p => p.id === id)  //Go through array, find person that matches the argument id

      if(window.confirm(`Are you sure you want to delete ${targetPerson.name} from the phonebook?`)) {
        numbersService
        .deleteListing(id, targetPerson)
          .then( () => {
            setPeople(people.filter(person => person.id !== targetPerson.id)) //updated list here
          })
          .catch(error => {
            setNotifMessage(
              `The listing of ${targetPerson.name} has already been deleted from the server`
            )
            setPeople(people.filter(person => person.id !== targetPerson.id))
          })
      }
    }

    const fillNewPersonInfo = param => {      //To render the updated values
      return (event) => {
        setNewPerson({...newPerson, [param]: event.target.value})
        console.log(event.target.value)
      }
    }

    const SearchForPerson = () => {
      const searchFilter = listing => listing.name.includes(searchedName);
      const searchMapping = listing => <Person key={listing.name} content={listing}/>;
      const searchResults = people.filter(searchFilter);

      if(searchedName === '') {
        return false;
      }
      console.log('These are the search results: ', searchResults);
      if(searchResults.length === 0) {
        return <p>No matching names were found!</p>;
      }
      console.log('People: ', people)
      return searchResults.map(searchMapping);
    }

    return (
      <div>
        <Notification message={notifMessage} />
        <h2>Search</h2>
        <div>
          <form>
            field: <input
            value={searchedName}
            onChange={event => setSearchedName(event.target.value)}
            />  
          </form>

          <h3>Matching Results:</h3>

          <ul>
            <SearchForPerson />
          </ul>
        </div>
          
        <h2>Phonebook</h2>

        <PhoneBook name={newPerson.name} number={newPerson.number} 
        nameChange={fillNewPersonInfo('name')} numberChange={fillNewPersonInfo('number')}
        submitFunction={addPersonInfo} />

        <h2>Numbers</h2>
            <ul>
              {people.map(person =>
                <Person key={person.id} content={person} deletion={() => deletePersonInfo(person.id)} />
              )}
            </ul>
      </div>
    )
  }
  
  export default App
  