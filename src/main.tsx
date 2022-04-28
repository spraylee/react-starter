import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { AppRouter } from './router'

import './styles/index.css'
import '@unocss/reset/tailwind.css'
import 'uno.css'
import { ColorSchemeProvider, MantineProvider } from '@mantine/core'
import { App } from './App'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
