import { useState, useEffect } from 'react'
import people from './service/person'
import Notif from './service/Notification'
import './index.css'


const Person = ({person, onDelete}) => <div>{person.name} {person.number} <button onClick={() => onDelete(person.id)}>Delete</button> </div>

const Persons = ({data, filter, onDelete}) => {
  const showPeople = data.filter(person => person.name.toLowerCase().includes(filter.toLowerCase()))
  return (
    <>
      {showPeople.map(person => <Person key={person.id} person={person} onDelete={onDelete}/>)}
    </>
  )
}
const Filter =  ({person, filter}) => <div>Filter: <input value={person} onChange={filter} /></div>


const Add = ({ persons,  setterPerson, setFiller}) => {

  const [newName, setNewName] = useState('')
  const [newNum, setNewNum] = useState('')

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumChange = (event) => {
    setNewNum(event.target.value)

  }

  const submitForm = (event) => {
    event.preventDefault()

    if (persons.find(person => person.name === newName)) {
      const person = persons.find(p => p.name === newName)
        if (window.confirm(`${newName} is already addewd to phonebook, replace the old number with a new one?`)) {
            const nameObject = {
              name: newName,
              number: newNum,
            }
            people.update(person.id, nameObject)
            .then(updatedPerson => {
              setFiller({message: `${updatedPerson.name} updated!`, type: "success"})
              setterPerson(persons.map(p => p.id === person.id ? updatedPerson : p))
              setNewNum("")
              setNewName("")
            })
            .catch(error => {
                setFiller({message: `${newName} already removed!`, type: "error"})
            })
        } else {
          setNewNum('')
          setNewName('')
        }

    }

    else {

      const nameObject = {  
        name: newName,
        number: newNum,
      }

      people.create(nameObject)
      .then(addPerson => {
        setFiller({message: `${addPerson.name} Added!`, type: "success"})
        setterPerson(persons.concat(addPerson))
        setNewName('')
        setNewNum('')
      })
      
    }
  }
  return (
    <form onSubmit={submitForm}>
      <div>Name: <input value={newName} onChange={handleNameChange} /></div>
      <div>Number: <input value={newNum} onChange={handleNumChange} /></div>
      <div> <button type="submit">Add</button> </div>
    </form>
    )
}



const App = () => {
  const [persons, setPersons] = useState([
  ])

  const [filterName, setFilterName] = useState('')
  const [fillerName, setFiller] = useState(null)

  console.log(fillerName)

  const handleFilter = (event) => {
    setFilterName(event.target.value)
  }

  const deleteName = (id) => {
    const name = persons.find(person => person.id === id)

    if (window.confirm(`Delete ${name.name}? `)) {
      console.log(typeof id)
      people.deleteData(id)
      .then(setPersons(persons.filter(person => person.id !== id)))
    }

  }

  useEffect(() => {
    people.getAll()
    .then(initialPerson => setPersons(initialPerson))
  }, [])

  return (
    <div>
      <h2>Phonebook</h2>
      
      <Notif message={fillerName} />

      <Filter person={filterName} filter={handleFilter} />

      <h3>Add a new</h3>

      <Add persons={persons} setterPerson={setPersons} setFiller={setFiller} />

      <h3>Numbers</h3>
      
      <Persons data={persons} filter={filterName} onDelete={deleteName} />

    </div>
  )
}

export default App

