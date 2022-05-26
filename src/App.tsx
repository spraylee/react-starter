import { ColorScheme, ColorSchemeProvider, MantineProvider } from '@mantine/core'
import { useHotkeys, useLocalStorage } from '@mantine/hooks'
import { ModalsProvider } from '@mantine/modals'
import { useEffect, useState } from 'react'
import { BrowserRouter } from 'react-router-dom'
import { AppRouter } from './router'

export const App = () => {
  const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
  const [colorScheme, setColorScheme] = useLocalStorage<ColorScheme>({
    key: 'mantine-color-scheme',
    defaultValue: prefersDark ? 'dark' : 'light',
    getInitialValueInEffect: true,
  })

  const toggleColorScheme = (value?: ColorScheme) =>
    setColorScheme(value || (colorScheme === 'dark' ? 'light' : 'dark'))

  useHotkeys([['mod+J', () => toggleColorScheme()]])

  useEffect(() => {
    if ((colorScheme === 'dark') !== document.documentElement.classList.contains('dark'))
      document.documentElement.classList.toggle('dark')
  }, [colorScheme === 'dark'])

  return (
    <ColorSchemeProvider colorScheme={colorScheme} toggleColorScheme={toggleColorScheme}>
      <MantineProvider
        // theme={{
        //   // Override any other properties from default theme
        //   fontFamily: 'Open Sans, sans serif',
        //   spacing: { xs: 15, sm: 20, md: 25, lg: 30, xl: 40 },
        // }}
        theme={{ colorScheme }}
        defaultProps={{
          Modal: { overlayOpacity: 0.2, overlayBlur: 2, centered: true, closeOnClickOutside: false },
        }}
        withGlobalStyles
        withNormalizeCSS
      >
        <ModalsProvider
          modalProps={{ centered: true, title: '温馨提示', closeOnClickOutside: false }}
          labels={{ cancel: '取消', confirm: '确定' }}
        >
          <BrowserRouter>
            <AppRouter />
          </BrowserRouter>
        </ModalsProvider>
      </MantineProvider>
    </ColorSchemeProvider>
  )
}
