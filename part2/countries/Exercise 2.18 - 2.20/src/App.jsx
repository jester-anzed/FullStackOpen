import { useState, useEffect } from 'react'
import axios from 'axios'
import './index.css'

const App = () => {

  const [countries, setCountry] = useState([])
  const [userInput, setInput] = useState("")
  const [value, setValue] = useState(null)
 

  const handleChange = (event) => setInput(event.target.value)

  const searchCountry = (event) => {
    event.preventDefault()
  }



   const Filter = () => {
      const filter = countries.filter(country => country.toLowerCase().includes(userInput.toLowerCase()))

      useEffect(() => {
        if (filter.length === 1) {
          axios.get(`https://studies.cs.helsinki.fi/restcountries/api/name/${filter[0].toLowerCase()}`)
          .then(response => {
            console.log(response.data.name)
        })
       }
      }, [filter] )

      return (
        <div>"Yikes"</div>
      )

    }


      
     

  useEffect(() => {
    axios.get('https://studies.cs.helsinki.fi/restcountries/api/all')
    .then(response => {
        setCountry(response.data.map(d => d.name.common))
    })
  }, [] )

  return ( 
    <>
      <form onSubmit={searchCountry}>
          Find Country: <input value={userInput} onChange={handleChange}/>
          <button type="submit">Submit</button>
      </form>
      <Filter />
    </>
  )

}



export default App
