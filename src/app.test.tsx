import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/preact'
import { App } from './app'

describe('App', () => {
  it('should render the app', () => {
    render(<App />)
    expect(screen.getByText('Vite + Preact')).toBeInTheDocument()
  })

  it('should increment count when button is clicked', async () => {
    render(<App />)
    const button = screen.getByRole('button', { name: /count is 0/i })
    expect(button).toBeInTheDocument()

    await button.click()
    expect(screen.getByRole('button', { name: /count is 1/i })).toBeInTheDocument()
  })
})