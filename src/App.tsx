import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from './pages/auth/login'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="auth/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
