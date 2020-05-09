import React from 'react'

const PhoneBook= (props) => {
    return (
        <form onSubmit={props.submitFunction}>
        <div>
          name: <input
          value={props.name} 
          onChange={props.nameChange}/>
          <br></br>
          phone number: <input 
          value={props.number} 
          onChange={props.numberChange}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    )
}

export default PhoneBook