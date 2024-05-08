import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { HomeIndex } from './pages/HomeIndex'
import { Login } from './pages/Login'
// Pages

function App() {

  return (
    <Router>
      <Routes>
        <Route path='/' element={<HomeIndex />} />
        <Route path='/login' element={<Login />} />
      </Routes>
    </Router>
  )
}

export default App
