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
        if (filter.length === 1 ) {
          axios.get(`https://studies.cs.helsinki.fi/restcountries/api/name/${filter[0].toLowerCase()}`)
          .then(response => {
            if (!value || value.name.common !== response.data.name.common) {
              setValue(response.data)
            }
          })
        } else if (value !== null) {
            setValue(null)
        }
      }, [userInput])
    

      if (filter.length > 10 ) return "Too many to specify" 
      if (filter.length < 10 && filter.length > 1) return <div>{filter.map(d => <div key={d}>{d}</div>)}</div>

      if (filter.length === 1 && value) {
        return ( 
          <div key={value.name.common}>

            <h1>{value.name.common}</h1>
            <div>Capital: {value.capital}</div>
            <div>Area: {value.area}</div>

            <h1>Languages</h1>
            <ul>{Object.values(value.languages).map(d => <li key={d}>{d}</li>)}</ul>
            
            <img src={value.flags.png} alt={value.flags.alt}/>


          </div>

        )

      }
    
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
