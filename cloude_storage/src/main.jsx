import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import AppRouter from './router'
import { AuthProvider } from './components/AuthContext/AuthContext'


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <AppRouter/>
    </AuthProvider>
  </StrictMode>,
)
