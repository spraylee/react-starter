import { createElement, FC } from 'react'
import { Routes, Route, Link } from 'react-router-dom'
import { MainLayout } from '../layouts/main'
import { EmptyLayout } from '../layouts/empty'
import { IndexPage } from '../pages'

const config: { title: string; path: string; layout: FC<any>; component: FC<any> }[] = [
  { title: '空白页', path: '/', layout: EmptyLayout, component: IndexPage },
  { title: '布局页', path: '/layout', layout: MainLayout, component: IndexPage },
]

export function AppRouter() {
  return (
    <Routes>
      {config.map((i) => (
        <Route key={i.path} path={i.path} element={createElement(i.layout, {}, createElement(i.component))} />
      ))}
      <Route path="*" element={<div>404</div>} />
    </Routes>
  )
}
