import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import GameContextProvider from './context/GameContext.jsx'

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <GameContextProvider>
      <App />
    </GameContextProvider>
  </BrowserRouter>,
)
