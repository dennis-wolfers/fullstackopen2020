import React, { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import blogService from './services/blogs'
import loginService from './services/login'
import Togglable from './components/Togglable'
import BlogForm from './components/BlogForm'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [notificationMessage, setNotificationMessage] = useState(null)
  const [isError, setIsError] = useState(false)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  const blogFormRef = useRef()

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedInUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  useEffect(() => {
    blogService
      .getAll()
      .then(blogs => setBlogs( blogs ))  
  }, [user])

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username, password,
      })

      window.localStorage.setItem('loggedInUser', JSON.stringify(user))
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      console.error(exception)
      setNotificationMessage('login credentials not recognized')
      setIsError(true)
      setTimeout(() => {
        setNotificationMessage(null)
        setIsError(false)
      }, 5000)
    }
  }

  const handleLogout = () => {
    setUser(null)
    window.localStorage.removeItem('loggedInUser')
  }

  const addBlog = async (blogObject) => {
    blogFormRef.current.toggleVisibility()
    const returnedBlog = await blogService.create(blogObject)
    setBlogs(blogs.concat(returnedBlog))
    setNotificationMessage(`new blog added: ${returnedBlog.title} by ${returnedBlog.author}.`)
    setTimeout(() => {
      setNotificationMessage(null)
    }, 5000)
  }

  const blogForm = () => (
    <Togglable buttonLabel="create new blog" ref={ blogFormRef }>
      <BlogForm createBlog={ addBlog } />
    </Togglable>
  )

  if (user === null) {
    return (
      <div>
      <h2>log in to application</h2>
      <Notification message={ notificationMessage } isError={ isError } />
      <form onSubmit={handleLogin}>
        <div>
          username
          <input
          type='text'
          value={username}
          name='Username'
          onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password
          <input
          type='text'
          value={password}
          name='Password'
          onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type='submit'>login</button>
      </form>
    </div>
    )
  }

  return (
    <div>
      <h2>blogs</h2>
      <Notification message={ notificationMessage } isError={ isError } />
      <p>{ user.name } logged in 
        <button onClick={ handleLogout }>logout</button>
      </p>
      {blogForm()}
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} user={user} />
      )}
    </div>
  )
}

export default App