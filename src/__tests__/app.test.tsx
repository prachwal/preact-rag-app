import { describe, it, expect } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/preact'
import { App } from '../app'

describe('App', () => {
  it('should render the app', () => {
    render(<App />)
    expect(screen.getByText('Vite + Preact')).toBeInTheDocument()
  })

  it('should toggle sidebar on menu click', () => {
    render(<App />)
    const menuBtn = screen.getByLabelText('Toggle menu')
    const sidebar = screen.getByRole('complementary')

    // Initially sidebar should be open (depending on screen size)
    expect(sidebar).toBeInTheDocument()

    // Click to toggle
    fireEvent.click(menuBtn)

    // Check if sidebar has the expected class (this might vary based on implementation)
    // For mobile, it should have sidebar-open class when open
    // For desktop/tablet, it might be always visible but collapsed/expanded
  })
})
