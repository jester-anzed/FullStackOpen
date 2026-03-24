import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import LoginForm from './components/Login'
import NewBlog from './components/New'
import Notification from './components/Notification'
import blogService from './services/blogs'
import loginService from './services/login'
import './index.css'


const App = () => {
  const [blogs, setBlogs] = useState([])
  const [message, setMessage] = useState(null)
  const [messageType, setMessageType] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

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

  const handleLogin = async event => {
    event.preventDefault()

    try {
      const user = await loginService.login({ username, password})
      window.localStorage.setItem('loggedUser', JSON.stringify(user))
      
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch {
      setMessage('wrong credentials')
      setMessageType('error')
      setTimeout(() => {
        setMessage(null)
        setMessageType(null)
    }, 5000)
  }

}

const addBlog = event => { 
      event.preventDefault()
      const newBlogObject = {id: Date.now(), title, author, url}
      setBlogs(blogs.concat(newBlogObject))
      setTitle('')
      setAuthor('')
      setUrl('')
      setMessage(`a new blog ${title} by ${author} added`)
      setMessageType('success')
      setTimeout(() => {
        setMessage(null)
        setMessageType(null)
      }, 5000)

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
        <LoginForm handleLogin={handleLogin} username={username} setUsername={setUsername}
          password={password} setPassword={setPassword}/>
      </div>
    )
  } 

  return (
    <div>
      <h2>Blogs</h2>

      <p>{user.username} logged in <button onClick={logoutHandle}>Logout</button></p>

      <h2>Create New</h2>
      <Notification message={message} type={messageType} />
      <NewBlog addBlog={addBlog} title={title} setTitle={setTitle} author={author} setAuthor={setAuthor}
        url={url} setUrl={setUrl} />

      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )

}


export default App