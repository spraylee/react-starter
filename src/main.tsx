import React from 'react'
import ReactDOM from 'react-dom/client'
import { AppRouter } from './router'

import './styles/index.css'
// import '@unocss/reset/tailwind.css'
import 'uno.css'
import { App } from './App'

import dayjs from 'dayjs'
import 'dayjs/locale/zh-cn'
import relativeTime from 'dayjs/plugin/relativeTime'
dayjs.extend(relativeTime)
dayjs.locale('zh-cn')

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
