import React, { useState } from 'react'

const Blog = ({blog, user}) => {
  const [detailsDisplayed, setDetailsDisplayed] = useState(false)

  const buttonLabel = detailsDisplayed ? 'hide' : 'view'

  const handleClick = () => {
    setDetailsDisplayed(!detailsDisplayed)
  }

  const displayToggle = { display: detailsDisplayed ? '' : 'none' }

  const blogSytle = {
    padding: 4,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  return (
    <div style={ blogSytle }>
      {blog.title}<i> by </i>{blog.author} <button onClick={ handleClick }>{ buttonLabel }</button>
        <span style={ displayToggle }>
          <br/>
          {blog.url}<br/>
          likes: {blog.likes} <button>like</button><br/>
          {blog.user.id}
        </span>
    </div>  
  )
}

export default Blog