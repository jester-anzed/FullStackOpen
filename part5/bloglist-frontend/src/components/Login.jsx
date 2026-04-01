import { useState } from 'react'

const LoginForm = ({ loginData }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = event => {
    event.preventDefault()
    loginData({
      username: username,
      password: password
    })
    setUsername('')
    setPassword('')
  }

  return  (
    <form onSubmit={handleLogin}>
      <div>
        <label>
              Username:
          <input
            type="text"
            value={username}
            onChange={({ target }) => setUsername(target.value)}
          />
        </label>
      </div>
      <div>
        <label>
              Password:
          <input
            type="text"
            value={password}
            onChange={({ target }) => setPassword(target.value)}
          />
        </label>
      </div>
      <button type="submit">Login</button>
    </form>
  )
}
export default LoginForm