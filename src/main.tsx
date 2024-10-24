import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import App from './App'

export type TWernik = string
export const name: TWernik = 'Wernik'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
