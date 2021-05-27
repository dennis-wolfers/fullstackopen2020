import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [notificationMessage, setNotificationMessage] = useState(null)
  const [isError, setIsError] = useState(false)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

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

  const addBlog = async (event) => {
    event.preventDefault()

    const newBlog = {
      title: title,
      author: author,
      url: url
    }

    try {
      const addedBlog = await blogService.create(newBlog)
      setTitle('')
      setAuthor('')
      setUrl('')
      setBlogs(blogs.concat(addedBlog))
      setNotificationMessage(`new blog added: ${newBlog.title} by ${newBlog.author}.`)
      setTimeout(() => {
        setNotificationMessage(null)
      }, 5000)
    } catch (exception) {
      console.error(exception)
    }
  }

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
      <h2>create new</h2>
      <form onSubmit={ addBlog }>
        <div>
          title:
            <input
            type='text'
            value={ title }
            name='Title'
            onChange={({ target }) => setTitle(target.value)}
            />
        </div>
        <div>
          author:
            <input 
              type='text'
              value={ author }
              name='Author'
              onChange={({ target }) => setAuthor(target.value)}
            />
        </div>
        <div>
          url:
            <input 
              type='text'
              value={ url }
              name='URL'
              onChange={({ target }) => setUrl(target.value)}
            />
        </div>
        <button type='submit'>create</button>
      </form>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
}

export default App