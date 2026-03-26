import { useState } from 'react'

const Blog = ({ blog }) => {
  const [visible, setVisible] = useState(false)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const hideDetails = { display: visible ? 'none' : '' }
  const showDetails = { display: visible ? '' : 'none' }

  const visibilityToggle = () => {
    setVisible(!visible)
  }


  return (
    <div style={blogStyle}>
      <div style={hideDetails}>
        {blog.title} {blog.author} <button onClick={visibilityToggle}>View</button>
      </div>
      <div style={showDetails}>
        <div>
          {blog.title}
          <button onClick={visibilityToggle}>Hide</button>
        </div>
        <div>
          {blog.url}
        </div>
        <div>
          {blog.likes}
          <button>like</button>
        </div>
        <div>
          {blog.author}
        </div>
      </div>
  
  </div>
)}

export default Blog