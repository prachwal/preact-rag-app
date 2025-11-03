import preactLogo from './assets/preact.svg'
import viteLogo from '/vite.svg'
import { useState, useEffect } from 'preact/compat'
import { Router, Route, LocationProvider } from 'preact-iso'
import { Header } from './components/Header'
import { Sidebar } from './components/Sidebar'
import { Footer } from './components/Footer'
import { SettingsPage } from './pages/SettingsPage'
import { CounterPage } from './pages/CounterPage'
import { DocumentationPage } from './pages/DocumentationPage'
import './i18n'

export function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [sidebarExpanded, setSidebarExpanded] = useState(true)

  // Initialize sidebar state based on screen size
  useEffect(() => {
    const checkScreenSize = () => {
      const width = window.innerWidth
      const isMobile = width < 768
      const isDesktop = width >= 992
      setSidebarOpen(true) // Always open in mobile (full screen), toggleable in desktop
      setSidebarExpanded(isMobile || isDesktop) // Expanded on mobile and desktop, collapsed on tablet
    }

    checkScreenSize()
    window.addEventListener('resize', checkScreenSize)
    return () => window.removeEventListener('resize', checkScreenSize)
  }, [])

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen)
  const toggleSidebarExpanded = () => setSidebarExpanded(!sidebarExpanded)
  const closeSidebar = () => setSidebarOpen(false)

  return (
    <LocationProvider>
      <div class="app-container">
        <Header
          title="Vite + Preact"
          onMenuClick={toggleSidebar}
          sidebarOpen={sidebarOpen}
        >
          <a href="https://vite.dev" target="_blank" rel="noopener noreferrer">
            <img src={viteLogo} class="logo" alt="Vite logo" />
          </a>
          <a href="https://preactjs.com" target="_blank" rel="noopener noreferrer">
            <img src={preactLogo} class="logo preact" alt="Preact logo" />
          </a>
        </Header>

        <div class={`app-layout ${sidebarExpanded ? 'sidebar-expanded' : 'sidebar-collapsed'}`}>
          <Sidebar
            isOpen={sidebarOpen}
            isExpanded={sidebarExpanded}
            onClose={closeSidebar}
            onToggleExpanded={toggleSidebarExpanded}
          />

          {sidebarOpen && window.innerWidth < 768 && (
            <div class="sidebar-overlay" onClick={closeSidebar} />
          )}

          <main class="main-content">
            <Router>
              <Route path="/" component={SettingsPage} />
              <Route path="/settings" component={SettingsPage} />
              <Route path="/counter" component={CounterPage} />
              <Route path="/documentation" component={DocumentationPage} />
            </Router>
          </main>
        </div>

        <Footer />
      </div>
    </LocationProvider>
  )
}
