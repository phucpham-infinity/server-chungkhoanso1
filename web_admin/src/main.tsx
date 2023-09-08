import React from 'react'
import ReactDOM from 'react-dom/client'
import ThemeProvider from './theme'
import RouterProvider from './router'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeProvider>
      <RouterProvider />
    </ThemeProvider>
  </React.StrictMode>,
)
