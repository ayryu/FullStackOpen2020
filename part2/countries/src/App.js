import React, { useState, useEffect } from 'react'
import Country from './components/country'
import axios from 'axios'
import FeaturedCountry from './components/featuredcountry'

const App = () => {
  const [listOfCountries, setListOfCountries] = useState([])
  // const [featuredCountry, setFeaturedCountry] = useState('')
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    const searchForCountry = async () => {
      
      try {
        const response = await axios.get('https://restcountries.eu/rest/v2/all')
        setListOfCountries(response.data)
      } catch (error) {
        console.log('Does not work')
      }

    } 
    searchForCountry()
  }, [])

  const FilteredCountries = () => {
    const myFilter = country => country.name.toLowerCase().includes(searchTerm.toLowerCase())
    const MyMapping = country => <Country country={country}/>
    const searchResults = listOfCountries.filter(myFilter)
    
    if(searchTerm === '') {
      return <p>Please enter a search term!</p>;
    }
    
    if(searchResults.length > 10) {
      return <p>Too many matches, specify another filter</p>
    }

    if(searchResults.length === 1) {
      const featured = searchResults[0]
      return <FeaturedCountry country={featured}/>
    }

    return searchResults.map(MyMapping);
  }
  
  return (
    <div>
      <h1>Countries uwu</h1>

    <div>
      <form>
          Find countries: <input
            value={searchTerm}
            onChange={event => setSearchTerm(event.target.value)}
          />
      </form>
    </div>
    
    <ul>
      <FilteredCountries />
    </ul>

    </div>
    
  )
}

export default App
