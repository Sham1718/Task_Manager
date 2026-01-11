import { BrowserRouter ,Route,Routes } from 'react-router-dom'
import './App.css'
import Login from './pages/login'
import Register from './pages/Register'
import Dashboard from './pages/Dashboard'
import Navbar from './components/Navbar'
import ProtectedRoute from './components/ProtectedRoute'

function App() {
  

  return (
    <>
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Login/>}/>
      <Route path='/register' element={<Register/>}/>
      <Route path='/dashboard' element={<ProtectedRoute>
          <Dashboard/>
        </ProtectedRoute>}/>
      
    </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
