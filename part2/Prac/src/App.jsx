import { useState, useEffect } from 'react'
import task from "./service/notes"


const Duty = ({duty, onToggle}) => {
  return (
    <div key={duty.id}>
      <div>Title: {duty.title}</div>
      <div>Description: {duty.desription}</div>
      <button onClick={() => onToggle=(duty.completed)}>Completed</button>
    </div>
  )
}


 const Test = ({duty}) => {
  console.log(duty)
 }

const Filter = ({filter, setter}) => {
  return (
    <div>
      <div>Filter: <input value={filter} onChange={setter}/></div>

    </div>
  )

}


const App = () => {
  const [duty, setterDuty] = useState([])
  const [filter, setterFilter] = useState("")

 

  const filterChange = (event) => {
    setterFilter(event.target.value)
  }


  useEffect(() => {
    task.getAll()
    .then(allTask => {
      setterDuty(allTask)
    })
  }, [])


  return (
    


    <div>
    
    <h2>All Duties!</h2>
    <Filter filter={filter} setter={filterChange} />
    <Test duty={duty} />
    </div>
  )

}


export default App