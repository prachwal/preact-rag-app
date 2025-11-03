import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/preact'
import { App } from '../app'

describe('App', () => {
  it('should render the app', () => {
    render(<App />)
    expect(screen.getByText('Vite + Preact')).toBeInTheDocument()
  })
})
