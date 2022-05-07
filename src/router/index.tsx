import { Routes, Route, Link } from 'react-router-dom'
import { DarkSwitch } from '../components/DarkSwitch'
import { IndexPage } from '../pages'

export function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<IndexPage />} />
    </Routes>
  )
}
