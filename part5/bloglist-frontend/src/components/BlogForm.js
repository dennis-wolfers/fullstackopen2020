import React, { useState } from 'react'
import App from '../App'
import blogService from '../services/blogs'

const BlogForm = () => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')


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
      App.setBlogs(App.blogs.concat(addedBlog))
      App.setNotificationMessage(`new blog added: ${newBlog.title} by ${newBlog.author}.`)
      setTimeout(() => {
        App.setNotificationMessage(null)
      }, 5000)
    } catch (exception) {
      console.error(exception)
    }
  }

  return (
    <div>
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
    </div>
  )
}

export default BlogForm