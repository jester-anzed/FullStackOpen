


const Course = ({course}) => {
  const total = course.parts.reduce((sum, part) => {
    return sum + part.exercises
  }, 0)

  const redux = 11

  return (
    <div>
      <h2>{course.name}</h2>
      {course.parts.map(part => <p key={part.id}>{part.name} {part.exercises}</p>)}
      <p>Redux {redux}</p>
      <h5>total of {total + redux} exercises</h5>
    </div>
  )
}


const App = () => {
  const course = {
    id: 1,
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10,
        id: 1
      },
      {
        name: 'Using props to pass data',
        exercises: 7,
        id: 2
      },
      {
        name: 'State of a component',
        exercises: 14,
        id: 3
      }
    ]
  }

  return <Course course={course} />
}

export default App