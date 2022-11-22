import Dashboard from 'pages/dashboard'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Account from 'pages/accounts'
import Login from 'pages/auth/login'
import User from 'pages/users'
import Teams from 'pages/teams'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="auth/login" element={<Login />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="accounts" element={<Account />} />
        <Route path="/accounts/:id/teams" element={<Teams />} />
        <Route path="users" element={<User />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
