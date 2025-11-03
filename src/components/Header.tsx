import { memo } from "preact/compat"
import { LanguageSwitcher } from "./LanguageSwitcher"
import { ThemeSwitcher } from "./ThemeSwitcher"

interface HeaderProps {
  title: string
  children?: preact.ComponentChildren
  onMenuClick: () => void
  sidebarOpen: boolean
}

export const Header = memo(function Header({ title, children, onMenuClick, sidebarOpen }: HeaderProps) {
  return (
    <header class="app-header">
      <div class="header-content">
        <div class="header-left">
          <button
            class="hamburger-menu"
            onClick={onMenuClick}
            aria-label="Toggle menu"
            aria-expanded={sidebarOpen}
          >
            <span class={`hamburger-icon ${sidebarOpen ? 'open' : ''}`}>
              <span></span>
              <span></span>
              <span></span>
            </span>
          </button>
          <h1 class="header-title">{title}</h1>
        </div>
        <div class="header-controls">
          <ThemeSwitcher />
          <LanguageSwitcher />
        </div>
        {children && (
          <nav class="header-nav" aria-label="Main navigation">
            {children}
          </nav>
        )}
      </div>
    </header>
  )
})
