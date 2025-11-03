import preactLogo from './assets/preact.svg'
import viteLogo from '/vite.svg'
import { useStore } from './store'
import { useState, useEffect } from 'preact/compat'
import { Card } from './components/Card'
import { Header } from './components/Header'
import { Sidebar } from './components/Sidebar'
import { Footer } from './components/Footer'

export function App() {
  const { currentMode, currentVariant, nextMode, nextVariant } = useStore()
  const [counter, setCounter] = useState(0)
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [sidebarExpanded, setSidebarExpanded] = useState(true)

  // Initialize sidebar state based on screen size
  useEffect(() => {
    const checkScreenSize = () => {
      const isDesktop = window.innerWidth >= 768
      setSidebarOpen(true) // Always open in mobile (full screen), toggleable in desktop
      setSidebarExpanded(isDesktop)
    }

    checkScreenSize()
    window.addEventListener('resize', checkScreenSize)
    return () => window.removeEventListener('resize', checkScreenSize)
  }, [])

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen)
  const toggleSidebarExpanded = () => setSidebarExpanded(!sidebarExpanded)
  const closeSidebar = () => setSidebarOpen(false)

  return (
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
          <div class="content-grid">
            <Card title="Settings" level={2}>
              <div class="settings-info">
                <p><strong>Current Mode:</strong> {currentMode.value}</p>
                <p><strong>Current Variant:</strong> {currentVariant.value}</p>
              </div>
              <div class="button-group">
                <button
                  onClick={nextMode}
                  aria-label={`Switch to next mode, current is ${currentMode.value}`}
                  class="btn btn-primary"
                >
                  Mode: {currentMode.value}
                </button>
                <button
                  onClick={nextVariant}
                  aria-label={`Switch to next variant, current is ${currentVariant.value}`}
                  class="btn btn-secondary"
                >
                  Variant: {currentVariant.value}
                </button>
              </div>
            </Card>

            <Card title="Counter" level={2}>
              <div class="counter-container">
                <button
                  onClick={() => setCounter(counter - 1)}
                  aria-label="Decrement counter"
                  class="btn btn-icon"
                >
                  -
                </button>
                <span class="counter-display">{counter}</span>
                <button
                  onClick={() => setCounter(counter + 1)}
                  aria-label="Increment counter"
                  class="btn btn-icon"
                >
                  +
                </button>
              </div>
            </Card>

            <Card title="Lotrem" level={2}>
              <div>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                </p>
              </div>
            </Card>

            <Card title="Documentation" level={2}>
              <p class="highlight-box">
                Click on the Vite and Preact logos to learn more
              </p>
              <ul class="feature-list">
                <li>⚡ Lightning-fast HMR with Vite</li>
                <li>🎨 Multiple color themes</li>
                <li>📱 Fully responsive design</li>
                <li>♿ WCAG AA compliant colors</li>
              </ul>
            </Card>
          </div>
        </main>
      </div>

      <Footer />
    </div>
  )
}
