import { useState } from 'react'

const Phone = ({phone}) => <div>{phone}</div>


const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ]) 
  const [newName, setNewName] = useState('')


  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const addName = (event) => { 
    event.preventDefault() 

    if (persons.find(person => person.name === newName)) {
      return alert(`${newName} is already added to phonebook`)
    }
    else {

        const nameObject = {
          name: newName,
          id: String(persons.length + 1)
        }
        setPersons(persons.concat(nameObject))
        setNewName("")
    }
  }


  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addName} >
        <div>
          name: <input value={newName} onChange={handleNameChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
        <div>debug: {newName}</div>
      </form>
      <h2>Numbers</h2>
        <Phone phone={persons.map(person => <div key={person.name}>{person.name}</div>)} />
    </div>
  )
}

export default App