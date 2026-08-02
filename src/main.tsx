import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
// Premium Arabic Fonts (Readex Pro & Tajawal)
import '@fontsource/readex-pro/300.css'
import '@fontsource/readex-pro/400.css'
import '@fontsource/readex-pro/500.css'
import '@fontsource/readex-pro/600.css'
import '@fontsource/readex-pro/700.css'
import '@fontsource/tajawal/400.css'
import '@fontsource/tajawal/500.css'
import '@fontsource/tajawal/700.css'
import './index.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
