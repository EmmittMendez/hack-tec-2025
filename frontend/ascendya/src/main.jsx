import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import useStore from './store/userStore.js'

// Inicializar autenticación al cargar la app
useStore.getState().initAuth();

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
