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


  

  const showPeople = persons.filter(person => person.name.toLowerCase().includes(filterName.toLowerCase()))
 

  const Filter = (event) => {
    event.preventDefault()
    setFilterName(event.target.value)
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
      <form>
        <div>filter shown with <input value={filterName} onChange={Filter} /></div>
      </form>
      <h2>Add A New</h2>
      <form onSubmit={addName} >
        <div> name: <input value={newName} onChange={handleNameChange} /> </div>
        <div> number: <input value={newNum} onChange={handleNumChange}/></div>
        <div> <button type="submit">add</button> </div>
      </form>
      <h2>Numbers</h2>
        <Phone phone={showPeople.map(person => <div key={person.id}>{person.name} {person.number}</div>)} />
    </div>
  )
}