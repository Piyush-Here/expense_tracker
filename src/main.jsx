import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { ThemeProvider } from './context/ThemeProvider.jsx'
import { polyfillCountryFlagEmojis } from 'country-flag-emoji-polyfill';
import './css/index.css'
import App from './App.jsx'

// Call it once before your React app renders
polyfillCountryFlagEmojis();
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ThemeProvider>
      <App />
    </ThemeProvider>
  </StrictMode>,
)
