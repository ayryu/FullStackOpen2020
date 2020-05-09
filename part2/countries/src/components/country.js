import React, { useState } from 'react'
import FeaturedCountry from './featuredcountry'

const Country = ({ country }) => {
    const [countryVisibility, setCountryVisibility] = useState(false)

    function handleClick() {
        const visibility = countryVisibility;
        setCountryVisibility(!visibility);
    }

        return (
            <div>
                <p>
                    {country.name} <a href="#" onClick={handleClick}>Show</a>
                </p>
                <div>
                    {countryVisibility && <FeaturedCountry country={country} />}
                </div>
            </div>
        );

}

export default Country