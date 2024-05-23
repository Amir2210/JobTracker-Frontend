import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { HomeIndex } from './pages/HomeIndex'
import { Login } from './pages/Login'
import { CreateUser } from './pages/CreateUser'
// Pages

//store
import { store } from './store/store'
import { Provider } from 'react-redux'
import { Jobs } from './pages/Jobs'

import 'react-toastify/dist/ReactToastify.css'
import { ToastContainer } from 'react-toastify'
import { AddJob } from './pages/AddJob'
import { Stats } from './pages/Stats'

function App() {

  return (
    <Provider store={store}>
      <ToastContainer position='top-center' autoClose={2000} />
      <Router>
        <Routes>
          <Route path='/' element={<HomeIndex />} />
          <Route path='/login' element={<Login />} />
          <Route path='/createUser' element={<CreateUser />} />
          <Route path='/jobs' element={<Jobs />} />
          <Route path='/addJob' element={<AddJob />} />
          <Route path='/stats' element={<Stats />} />
        </Routes>
      </Router>
    </Provider>
  )
}

export default App
