import { useState } from 'react'

const Phone = ({phone}) => <div>{phone}</div>


const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-1234567' }
  ]) 
  const [newName, setNewName] = useState('')
  const [newNum, setNewNum] = useState('')


  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumChange = (event) => {
    setNewNum(event.target.value)
  }

  const addName = (event) => { 
    event.preventDefault() 

    if (persons.find(person => person.name === newName)) {
      return alert(`${newName} is already added to phonebook`)
    }
    else {

        const nameObject = {
          name: newName,
          number: newNum,
          id: String(persons.length + 1)
        }
        setPersons(persons.concat(nameObject))
        setNewName("")
        setNewNum("")
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addName} >
        <div> name: <input value={newName} onChange={handleNameChange} /> </div>
        <div> number: <input value={newNum} onChange={handleNumChange}/></div>
        <div> <button type="submit">add</button> </div>
        <div>debug: {newName}</div>
        <div>debug: {newNum}</div>
      </form>
      <h2>Numbers</h2>
        <Phone phone={persons.map(person => <div key={person.name}>{person.name} {person.number}</div>)} />
    </div>
  )
}

export default App