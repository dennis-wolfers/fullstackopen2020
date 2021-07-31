import React, { useState } from 'react'
import blogsService from '../services/blogs'

const Blog = ({ blog, blogs, setBlogs }) => {
  const [detailsDisplayed, setDetailsDisplayed] = useState(false)

  const buttonLabel = detailsDisplayed ? 'hide' : 'view'

  const handleClick = () => {
    setDetailsDisplayed(!detailsDisplayed)
  }

  const incrementLikes = async () => {
    const updatedBlog = {
      user: blog.user,
      title: blog.title,
      author: blog.author,
      url: blog.url,
      likes: (blog.likes + 1)
    }

    const returnedBlog = await blogsService.update(blog.id, updatedBlog)

    const updatedBlogs = blogs.map(blog => {
      if (blog.id === returnedBlog.id) return returnedBlog
      return blog
    })
    setBlogs(updatedBlogs)
  }

  const displayToggle = { display: detailsDisplayed ? '' : 'none' }

  const blogSytle = {
    padding: 4,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  return (
    <div style={blogSytle}>
      {blog.title}<i> by </i>{blog.author} <button onClick={handleClick}>{buttonLabel}</button>
      <span style={displayToggle}>
        <br />
        {blog.url}<br />
        likes: {blog.likes} <button onClick={incrementLikes}>like</button><br />
        {blog.user.id}
      </span>
    </div>
  )
}

export default Blog