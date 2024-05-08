import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { HomeIndex } from './pages/HomeIndex'
import { Login } from './pages/Login'
import { CreateUser } from './pages/CreateUser'
// Pages

function App() {

  return (
    <Router>
      <Routes>
        <Route path='/' element={<HomeIndex />} />
        <Route path='/login' element={<Login />} />
        <Route path='/createUser' element={<CreateUser />} />
      </Routes>
    </Router>
  )
}

export default App
