import { useState } from 'react'

export const IndexPage = () => {
  const [count, setCount] = useState(0)
  return (
    <div className="App">
      <header className="App-header">
        {/* <img src={logo} className="App-logo" alt="logo" /> */}
        <p>Hello Vite + React!</p>
        <p>
          <button type="button" className="btn" onClick={() => setCount((count) => count + 1)}>
            count is: {count}
          </button>
        </p>
        <div className="i-carbon:add text-lg"></div>
        <p>
          Edit <code>App.tsx</code> and save to test HMR updates.
        </p>
        <p>
          <a className="App-link" href="https://reactjs.org" target="_blank" rel="noopener noreferrer">
            Learn React
          </a>
          {' | '}
          <a
            className="App-link"
            href="https://vitejs.dev/guide/features.html"
            target="_blank"
            rel="noopener noreferrer"
          >
            Vite Docs
          </a>
        </p>
      </header>
    </div>
  )
}