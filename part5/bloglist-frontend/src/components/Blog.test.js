import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'

describe('<Blog />', () => {
  let component
  const blog = {
    title: 'blog title',
    author: 'blog author',
    url: 'blog url',
    likes: 7,
    user: '123456789'
  }

  beforeEach(() => {
    component = render(
      <Blog blog={blog} />
    )
  })

  test('renders blog title and author, but not URL or likes by default', () => {
    expect(component.container).toHaveTextContent('blog title')
    expect(component.container).toHaveTextContent('blog author')
    expect(component.container.querySelector('.details')).toHaveStyle('display: none')
  })

  test('pressing the details button shows the url and likes', () => {
    const button = component.getByText('view')
    fireEvent.click(button)
    expect(component.container.querySelector('.details')).not.toHaveStyle('display: none')
  })
})