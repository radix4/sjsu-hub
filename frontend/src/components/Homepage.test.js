import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import HomePage from './HomePage'

// Simple text test
test('renders content', () => {
  render(<HomePage />)

  const element = screen.getByText('A Space for All Spartans!')
  expect(element).toBeDefined()
})
