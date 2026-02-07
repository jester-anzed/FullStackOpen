import { useState } from 'react'


const Watched = ({movies}) => {
  const count = movies.filter(movie => movie.watched).length 
  return <div>Watched Movies: {count}</div>

}

const Unwatched = ({movies}) => {
  const count = movies.filter(movie => !movie.watched).length 
  return <div>Unwatched Movies: {count}</div>
  
}

const statusButton = () => {


}


const Movies = ({movies, filter, onDelete, watched, status}) => {
  const filtered = movies.filter(movie => movie.title.toLowerCase().includes(filter.toLowerCase()))
  return filtered.map(movie => <Movie key={movie.id} movies={movie} onDelete={onDelete} watched={watched} />)
  
}

const Movie = ({movies, onDelete, watched}) => 
<div>
  Movie: {movies.title} 
  Year: {movies.year} 
  <button onClick={() => onDelete(movies.id)}>Delete</button> 
  <button onClick={() => watched(movies.id)}>{movies.watched ? "Watched" : "To Watch"}</button>
</div>
  
const Filter = ({filter, setFilter}) => <div><input value={filter} onChange={setFilter}/></div>
  

const MovieForm = ({movies, setter}) => {

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
    if (movies.find(movie => movie.title === movieName)) {
      setMovie("")
      setYear("")
      return alert(`${movieName} is already on the list!`)
        
    } else {

      const nameObject = {  
        title: movieName,
        year: movieYear,
        watched: true,
        id: String(movies.length + 1)
      }
    setter(movies.concat(nameObject))
    setMovie("")
    setYear("")
    }
  }

  return (
    <form onSubmit={addMovie}>
      <div>
        <div>Name: <input value={movieName} onChange={movieNameChange}/></div>
        <div>Year: <input type="number" value={movieYear} onChange={movieYearChange}/></div>
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

  const [filter, setFilter] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')


  const handleFilter = (event) => {
    setFilter(event.target.value)
    console.log(event.target.value)
  }

  const handleDelete = (id) => {
    const newList = movies.filter(movie => movie.id !== id)
    setMovies(newList)
  }
  
  const toggleWatch = (id) => {
    const newList = movies.map(movie => movie.id === id ? {...movie, watched: !movie.watched}: movie)
    setMovies(newList)
  }

 const sortMovies = () => {
    const sorted = [...movies].sort((a, b) => a.title.localeCompare(b.title))
    setMovies(sorted)
  }

  const sortYear = () => {
    const sorted = [...movies].sort((a,b) => a.year - b.year)
    setMovies(sorted)
  }

  return (
    <>
      <h2>Filtered Movies:</h2>
      <Filter filter={filter} setFilter={handleFilter} />
      

      <h2>Movie List</h2>
      <button onClick={sortMovies}>Sort By Name</button> <button onClick={sortYear}>Sort By Year</button>
      <Movies movies={movies} filter={filter} onDelete={handleDelete} watched={toggleWatch} status={statusFilter} />

      <h2>Watched / Unwatched</h2>
      <Watched  movies={movies} /> <Unwatched movies={movies} />

      <h2>Add Movie</h2>
      <MovieForm movies={movies} setter={setMovies} />
    </>
  )

}

export default App