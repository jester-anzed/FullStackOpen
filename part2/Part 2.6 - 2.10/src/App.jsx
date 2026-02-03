import { useState } from 'react'



const Person = ({person}) => <div>{person.name} {person.number}</div>



const Persons = ({data, filter}) => {
  const showPeople = data.filter(person => person.name.toLowerCase().includes(filter.toLowerCase()))
  
  return (
    showPeople.map(person => <Person key={person.id} person={person} />)
  )
}


const Filter =  ({person, filter}) => <div>Filter: <input value={person} onChange={filter} /></div>



const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])

  const [newName, setNewName] = useState('')
  const [newNum, setNewNum] = useState('')
  const [filterName, setFilterName] = useState('')



  const handleFilter = (event) => {
    console.log(event.target.value)
    setFilterName(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>

      <Filter person={filterName} filter={handleFilter} />
      <div>Debug: {filterName}</div>

      <h3>Add a new</h3>


      <h3>Numbers</h3>
      <Persons data={persons} filter={filterName}/>  

    </div>
  )
}

export default App