import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import LoginForm from './components/Login'
import NewBlog from './components/New'
import Notification from './components/Notification'
import blogService from './services/blogs'
import loginService from './services/login'
import Toggle from './components/Toggle'
import './index.css'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [message, setMessage] = useState(null)
  const [messageType, setMessageType] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
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

const addBlog = (handler) => { 
      setBlogs(blogs.concat(handler))
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

      <Toggle label="Create New">
        <Notification message={message} type={messageType} />
        <NewBlog handleSubmit={addBlog} />
      </Toggle>

      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )

}


export default App