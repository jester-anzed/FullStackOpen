import { useState } from 'react'



const Movies = ({movies, filter}) => {
  const filteredMovies = movies.filter(movie => movie.title === filter)

  return (
    filteredMovies.map(movie => <Movie movie={movie} />)

  )
}

const Movie = ({movie}) => {
  console.log(movie)
  return (
    <div key={movie.id}>
      <div>Title: {movie.title}</div>
      <div>Year: {movie.year}</div>
    </div>
  )
}



const Filter = ({filter, setFilter}) => {

  return(
    <>
    <div><input value={filter} onChange={setFilter}/></div>
    <div>Debug: {filter}</div>
    </>
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
      <Filter value={filteredMovie} onChange={handleFilter} />
    </>
  )

}

export default App