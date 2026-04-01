import { useState } from 'react'
import blogService from '../services/blogs'

const Blog = ({ blog, user, handleDelete }) => {
  const [visible, setVisible] = useState(false)
  const [likes, setLikes ] = useState(blog.likes)

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

  const updatedLikes = blog => {

    const newObject = {
      title: blog.title,
      author: blog.author,
      likes: likes + 1,
      url: blog.url,
      username: user.username
    }

    blogService.update(blog.id, newObject)
    setLikes(newObject.likes)

  }

  const deleteData = blog => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)) {
      blogService.deleteData(blog.id)
      handleDelete(blog.id)
    }
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
          {likes}
          <button onClick={() => updatedLikes(blog)}>like</button>
        </div>
        <div>
          {blog.author}
          {(blog.user.id === user.id || blog.user.username === user.username) && <button onClick={() => deleteData(blog)}>Delete</button>}
        </div>
      </div>

    </div>
  )}

export default Blog