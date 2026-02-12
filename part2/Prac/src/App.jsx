import { useState, useEffect } from 'react'
import task from "./service/notes"


const Duty = ({duty, onToggle, onDelete}) => {
  return (
    <div key={duty.id}>
      <div>
        Title: {duty.title} ----
        <button onClick={() => onToggle(duty.id)}> {duty.completed ? 'Completed' : 'Incomplete' }</button>
        <button onClick={() => onDelete(duty.id)}> Delete</button>
        </div>
      <div>Description: {duty.description}</div>
    </div>
  )
}


 const Duties = ({duty, onToggle, filter, onDelete}) => {
  const filteredDuties = duty.filter(d => d.title.toLowerCase().includes(filter.toLowerCase()))
  return (
    <>
      {filteredDuties.map(d => <Duty key={d.id} duty={d} onToggle={onToggle} onDelete={onDelete}/>)}
    </>
  )

 }

const Filter = ({filter, setter}) => <div>Filter: <input value={filter} onChange={setter}/></div>
  


const Add = ({duty, setter}) => {
    const [dutyTitle, setDuty] = useState("")
    const [dutyDes, setDes] = useState("")
  
  
    const handleTitle = (event) =>  setDuty(event.target.value)
    const handleDes = (event) => setDes(event.target.value)

    


    const submitAdd = (event) => {
      event.preventDefault()


    if (duty.find(d => d.title === dutyTitle)) {
      const id = (duty.find(d => d.title === dutyTitle))
      if (window.confirm(`${dutyTitle} already in task!, want to update description?`)) {
        
        const nameObject = {
          title: dutyTitle,
          description: dutyDes,
          completed: false
        }

          task.update(id.id, nameObject)
          .then(allTask => {
            setter(duty.map(d => d.id === id.id ? allTask : d))
            setDuty("")
            setDes("")
          })

      }

    } else {

        const nameObject = {
          title: dutyTitle,
          description: dutyDes,
          completed: false,
        }

        task.create(nameObject)
        .then(tasks => {
          setter(duty.concat(tasks))
          setDes("")
          setDuty("")
        })

      }
    }


  return ( 
    <form onSubmit={submitAdd}>
      <div>Title: <input value={dutyTitle} onChange={handleTitle} /> </div>
      <div>Description: <input value={dutyDes} onChange={handleDes} /> </div>
      <select>
        <option>High</option>
        <option>Medium</option>
        <option>Low</option>
      </select>
      
      <button type="submit">Save</button>
    </form>
  )


}


const App = () => {
  const [duty, setterDuty] = useState([])
  const [filter, setterFilter] = useState("")




  const onToggle = (id) => {
    
    const update = duty.find(d => d.id === id)
    const updated = {...update , completed: !update.completed }
    
    task.update(id, updated)
    .then(data => {
      setterDuty(duty.map(d => d.id === id ? data :d ))
    })

  }

  const onDelete = (id) => {
    const name = duty.find(d => d.id === id)
    
    if (window.confirm(`Do you want to delete ${name.title}?`)) {
        task.onDelete(id)
        .then(data => {
        setterDuty(duty.filter(d => d.id !== id));
        })
      }
  }
  

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

    <h2>Add Task!</h2>
    <Add duty={duty} setter={setterDuty} />

    <h2>Task: </h2>
    <Duties duty={duty} filter={filter} onToggle={onToggle} onDelete={onDelete} />
    </div>
  )

}


export default App