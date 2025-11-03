import preactLogo from './assets/preact.svg'
import viteLogo from '/vite.svg'
import './app.css'
import { useStore } from './store'
import { useState } from 'preact/compat'

export function App() {
  const { settings, nextTheme } = useStore()
  const [counter, setCounter] = useState(0)

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} class="logo" alt="Vite logo" />
        </a>
        <a href="https://preactjs.com" target="_blank">
          <img src={preactLogo} class="logo preact" alt="Preact logo" />
        </a>
      </div>
      <h1>Vite + Preact</h1>
      <button onClick={nextTheme}>
        Theme: {settings.value.theme}
      </button>
      <div class="card">
        <button onClick={() => setCounter(counter + 1)}>
          +
        </button>
        <p>
          count is {counter}
        </p>
        <button onClick={() => setCounter(counter - 1)}>
          -
        </button>
      </div>
    </>
  )
}
