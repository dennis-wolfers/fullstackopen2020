import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render } from '@testing-library/react'
import Blog from './Blog'

test('renders blog title and author, but not URL or likes by default', () => {
  const blog = {
    title: 'blog title',
    author: 'blog author',
    url: 'blog url',
    likes: 7,
    user: '123456789'
  }

  const component = render(
    <Blog blog={blog} />
  )

  component.debug()

  expect(component.container).toHaveTextContent('blog title')
  expect(component.container).toHaveTextContent('blog author')
  expect(component.container.querySelector('.details')).toHaveStyle('display: none')
})