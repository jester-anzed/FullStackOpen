import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import LoginForm from './components/Login'
import NewBlog from './components/New'
import Notification from './components/Notification'
import blogService from './services/blogs'
import loginService from './services/login'
import './index.css'
import Toggle from './components/Toggle'


const App = () => {
  const [blogs, setBlogs] = useState([])
  const [message, setMessage] = useState(null)
  const [messageType, setMessageType] = useState(null)
  const [user, setUser] = useState(null)



  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )
  }, [])

  useEffect(() => {
    const loggedUser = window.localStorage.getItem('loggedUser')
    if (loggedUser) {
      const user = JSON.parse(loggedUser)
      setUser(user)
      blogService.setToken(user.token)

    }

  }, [])

  const handleLogin = async (handler) => {
    try {
      const user = await loginService.login({ username: handler.username, password: handler.password })
      window.localStorage.setItem('loggedUser', JSON.stringify(user))
      blogService.setToken(user.token)
      setUser(user)
    } catch {
      setMessage('wrong credentials')
      setMessageType('error')
      setTimeout(() => {
        setMessage(null)
        setMessageType(null)
      }, 2000)
    }

  }

  const addBlog = async (newBlog) => {
    const create = await blogService.create(newBlog)
    console.log(create)
    setBlogs(blogs.concat(create))
    setMessage(`a new blog ${newBlog.title} by ${newBlog.author} added`)
    setMessageType('success')
    setTimeout(() => {
      setMessage(null)
      setMessageType(null)
    }, 5000)

    console.log(create)

  }

  const logoutHandle = () => {
    window.localStorage.clear()
    setUser(null)
  }


  if (user === null) {
    return (
      <div>
        <h2>Log in to application</h2>
        <Notification message={message} type={messageType}  />
        <LoginForm loginData={handleLogin} />
      </div>
    )
  }

  const sortedBlogs = [...blogs].sort((a, b) => b.likes - a.likes)

  const handleDelete = id => {
    const blogsAfterDelete = blogs.filter(blog => blog.id !== id)
    setBlogs(blogsAfterDelete)
  }

  return (
    <div>
      <h2>Blogs</h2>

      <p>{user.username} logged in <button onClick={logoutHandle}>Logout</button></p>

      <Toggle label="Create New Blog">
        <Notification message={message} type={messageType} />
        <h2>Create New</h2>
        <NewBlog createBlog={addBlog} />
      </Toggle>

      {sortedBlogs.map(blog =>
        <Blog key={blog.id} blog={blog} user={user} handleDelete={handleDelete} />
      )}
    </div>
  )

}


export default App