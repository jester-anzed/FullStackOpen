import { useState } from 'react'



const Movies = ({movies, filter}) => {
  const filteredMovies = movies.filter(movie => movie.title.toLowerCase().includes(filter.toLowerCase()))
  return (
    filteredMovies.map(movie => <Movie key={movie.id} movies={movie} />)
  )
}

const Movie = ({movies}) => <div>Movie: {movies.title} Year: {movies.year} </div>
  
const Filter = ({filter, setFilter}) => <div><input value={filter} onChange={setFilter}/></div>
  

const MovieForm = (movies, setter) => {

  const [movieName, setMovie] = useState('')
  const [movieYear, setYear] = useState('')

  const movieNameChange = (event) => {
    setMovie(event.target.value)
  }

  const movieYearChange = (event) => {
    setYear(event.target.value)
  }

  const addMovie = (event) => {
    event.preventDefault()
    
    const nameObject = {  
      title: movieName,
      year: movieYear,
      id: String(movies.length + 1)
    }
    setter(movies.concat(nameObject))
    setMovie("")
    setYear("")
  }


  return (
    <form onSubmit={addMovie}>
      <div>
        <div>Name: <input value={movieName} onChange={movieNameChange}/></div>
        <div>Year: <input value={movieYear} onChange={movieYearChange}/></div>
        <div>Debug: {movieName}</div>
        <div>Debug: {movieYear}</div>
        <div><button type="submit">Submit</button></div>
      </div>

    </form>
  )
}

const App = () => {
  const [movies, setMovies] = useState([
  { title: 'Inception', year: 2010, watched: false, id: 1 },
  { title: 'The Matrix', year: 1999, watched: true, id: 2 },
  { title: 'Interstellar', year: 2014, watched: false, id: 3 }
  ])

  const [filteredMovie, setFilter] = useState('')


  const handleFilter = (event) => {
    setFilter(event.target.value)
    console.log(event.target.value)
  }

  return (
    <>
      <h2>Filtered Movies:</h2>
      <Filter filter={filteredMovie} setFilter={handleFilter} />

      <h2>Movie List</h2>
      <Movies movies={movies} filter={filteredMovie} />
      
      <h2>Add Movie</h2>
      <MovieForm movies={movies} setter={setMovies}/>
    </>
  )

}

export default App