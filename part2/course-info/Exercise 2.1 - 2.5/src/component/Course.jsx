const Course = ({courses}) => {

  return (
    <div> 
      {courses.map(course => {
        return (
           <div key={course.id}>
              <h2>{course.name}</h2>
              {course.parts.map(part => <p key={part.id}>{part.name} {part.exercises}</p>)}
              <h3>total of {course.parts.reduce((sum, part) => {
                  return sum + part.exercises
                },0)} exercises</h3>
           </div>
        )
      }
    )}
    </div>
  )
}


export default Course