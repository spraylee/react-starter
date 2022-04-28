import { Routes, Route, Link } from 'react-router-dom'
import { IndexPage } from '../pages'

export function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<IndexPage />} />
    </Routes>
  )
}
