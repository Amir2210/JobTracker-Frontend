import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { HomeIndex } from './pages/HomeIndex'
// Pages

function App() {

  return (
    <Router>
      <Routes>
        <Route path='/' element={<HomeIndex />} />
      </Routes>
    </Router>
  )
}

export default App
