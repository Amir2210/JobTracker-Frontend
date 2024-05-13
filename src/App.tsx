import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { HomeIndex } from './pages/HomeIndex'
import { Login } from './pages/Login'
import { CreateUser } from './pages/CreateUser'
// Pages

//store
import { store } from './store/store'
import { Provider } from 'react-redux'
import { Jobs } from './pages/Jobs'

function App() {

  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path='/' element={<HomeIndex />} />
          <Route path='/login' element={<Login />} />
          <Route path='/createUser' element={<CreateUser />} />
          <Route path='/jobs' element={<Jobs />} />
        </Routes>
      </Router>
    </Provider>
  )
}

export default App
