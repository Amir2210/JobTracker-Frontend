import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { GoogleReCaptchaProvider } from 'react-google-recaptcha-v3'

// Pages
import { HomeIndex } from './pages/HomeIndex'
import { Login } from './pages/Login'
import { CreateUser } from './pages/CreateUser'
import { Jobs } from './pages/Jobs'
import { AddJob } from './pages/AddJob'
import { Stats } from './pages/Stats'

// Store
import { store } from './store/store'
import { Provider } from 'react-redux'

// Toast Notifications
import 'react-toastify/dist/ReactToastify.css'
import { ToastContainer } from 'react-toastify'

const RECAPTCHA_SITE_KEY = '6LdmGeIqAAAAAHNcTak6ecIWOh_kWqPeXI8IYrzH'

function App() {
  return (
    <GoogleReCaptchaProvider reCaptchaKey={RECAPTCHA_SITE_KEY}>
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
    </GoogleReCaptchaProvider>
  )
}

export default App
