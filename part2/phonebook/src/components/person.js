import React from 'react'

const Person = ({ content, deletion }) => {

    function handleClick() {
        deletion();
    }

    return (
    <p>
        {content.name} {content.number} <button onClick={handleClick}>Delete Listing</button> 
    </p>
    )
}

export default Person