import { useState } from 'react'
import { DarkSwitch } from '../components/DarkSwitch'

export const IndexPage = () => {
  const [count, setCount] = useState(0)
  return (
    <div className="App">
      <DarkSwitch></DarkSwitch>
      <header className="App-header">
        {/* <img src={logo} className="App-logo" alt="logo" /> */}
        <p>Hello Vite + React!</p>
        <p>
          <button type="button" className="btn" onClick={() => setCount((count) => count + 1)}>
            count is: {count}
          </button>
        </p>
        <div className="i-carbon:add text-lg"></div>
      </header>
    </div>
  )
}
