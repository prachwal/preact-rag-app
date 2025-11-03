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
    const incButton = screen.getByRole('button', { name: '+' })
    expect(incButton).toBeInTheDocument()

    await incButton.click()
    expect(screen.getByText('count is 1 inc')).toBeInTheDocument()

    const decButton = screen.getByRole('button', { name: '-' })
    expect(decButton).toBeInTheDocument()

    await decButton.click()
    expect(screen.getByText('count is 0 dec')).toBeInTheDocument()

  })
})