import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
// Tailwind nạp sau index.css - lý do ghi trong src/tailwind.css.
import './tailwind.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
