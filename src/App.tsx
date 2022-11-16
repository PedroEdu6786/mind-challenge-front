import Dashboard from 'pages/dashboard'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Account from 'pages/accounts'
import Login from './pages/auth/login'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="auth/login" element={<Login />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="accounts" element={<Account />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
