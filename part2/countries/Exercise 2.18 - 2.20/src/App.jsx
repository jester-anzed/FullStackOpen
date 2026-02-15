import { useState, useEffect } from 'react'
import axios from 'axios'
import './index.css'


const api_key = import.meta.env.VITE_WEATHER_KEY




const App = () => {

  const [countries, setCountry] = useState([])
  const [userInput, setInput] = useState("")
  const [value, setValue] = useState(null)
  const [weather, setWeather] =useState(null)

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
              return axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${response.data.name.common}&appid=${api_key}&units=metric`)
            }
          })
          .then(weather => {
            if (weather) {
              setWeather(weather.data)

            }
          })
        } else if (value && !filter.includes(value.name.common)) {
            setValue(null)
        }
      }, [userInput])

      if (value) {
        return ( 
  
          <div key={value.name.common}>

            <h1>{value.name.common}</h1>
            <div>Capital: {value.capital}</div>
            <div>Area: {value.area}</div>

            <h1>Languages</h1>
            <ul>{Object.values(value.languages).map(d => <li key={d}>{d}</li>)}</ul>
            
            <img src={value.flags.png} alt={value.flags.alt}/>

            <h1>Temperature in {value.name.common}</h1>
            {weather && (
            <div>
              <div>Temperature: {weather.main.temp} Celsius</div>
              <img src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} />
              <div>Wind {weather.wind.speed} m/s</div>
            </div>
            )}
            
          </div>
        )
      } 

      if (filter.length > 10 ) return "Too many to specify" 

      if (filter.length < 10 && filter.length > 1) {

        const showHandle = (name) => {
          axios.get(`https://studies.cs.helsinki.fi/restcountries/api/name/${name.toLowerCase()}`)
          .then(response => setValue(response.data))
        }

        return (
          <>
            <div>{filter.map(d => <div key={d}>{d} <button onClick={() => showHandle(d)}>Show</button> </div>)}</div>
          </>
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
          <button className="search" type="submit">Submit</button>
      </form>
      <Filter />
    </>
  )

}



export default App
