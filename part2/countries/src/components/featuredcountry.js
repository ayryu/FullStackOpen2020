import React from 'react'

const FeaturedCountry = ({ country }) => {
    return (
        <div>
            <p>{country.name}</p>

            <p>Capital: {country.capital}</p>
            <p>Population: {country.population}</p>

            <h3>Languages</h3>

            <ul>
                {country.languages.map(language => <li key={language.name}>{language.name}</li>)}
            </ul>

            <img src="https://restcountries.eu/data/afg.svg" alt="Flag"></img>
        </div>
        
    )
}

export default FeaturedCountry;