import preactLogo from './assets/preact.svg'
import viteLogo from '/vite.svg'
import './app.css'
import { useStore } from './store'

export function App() {
  const { count, inc, dec } = useStore()

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
      <div class="card">
        <button onClick={() => inc(1)}>
          +
        </button>
        <span style={{ "padding": "0 12px" }}>count is {count.value.count} {count.value.operation}</span>
        <button onClick={() => dec(1)}>
          -
        </button>
      </div>
      <div class='card'>
        <p>
          Edit <code>src/app.tsx</code> and save to test HMR updates.
        </p>
      </div>
      <p>
        Check out{' '}
        <a
          href="https://preactjs.com/guide/v10/getting-started#create-a-vite-powered-preact-app"
          target="_blank"
        >
          create-preact
        </a>
        , the official Preact + Vite starter
      </p>
      <p class="read-the-docs">
        Click on the Vite and Preact logos to learn more
      </p>
    </>
  )
}
