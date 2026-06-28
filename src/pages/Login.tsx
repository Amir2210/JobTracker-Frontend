import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { login } from '../store/actions/user.actions'
import { toast } from 'react-toastify'
import { LoginCredentials } from '../types/user.types'
import { useGoogleReCaptcha } from 'react-google-recaptcha-v3'
import { Helmet } from "react-helmet-async"
import { AuthLayout } from '../cmps/AuthLayout'
function getEmptyCredentials(): LoginCredentials {
  return {
    userName: '',
    password: '',
    recaptchaToken: ''
  }
}

export function Login() {
  const [credentials, setCredentials] = useState(getEmptyCredentials())
  const [errors, setErrors] = useState({ userName: '', password: '' })
  const { executeRecaptcha } = useGoogleReCaptcha()
  const navigate = useNavigate()
  function handleCredentialsChange(ev: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = ev.target
    let errorMessage = ''
    // Validation logic
    if (name === 'userName') {
      if (!/^[a-zA-Z0-9_]{3,15}$/.test(value)) {
        errorMessage = 'Username must be 3-15 characters (letters, numbers only).'
      }
    } else if (name === 'password') {
      if (value.length < 3) {
        errorMessage = 'Password must be at least 3 characters long.'
      }
    }

    setErrors((prevErrors) => ({ ...prevErrors, [name]: errorMessage }))
    setCredentials((prevCredentials) => ({ ...prevCredentials, [name]: value }))
  }

  async function onLogin(ev: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    ev.preventDefault()

    if (!executeRecaptcha) {
      toast.error("reCAPTCHA is not ready. Please try again.")
      return
    }
    // Prevent submission if there are errors
    if (errors.userName || errors.password || !credentials.userName || !credentials.password) {
      toast.error("Please correct the errors before submitting.")
      return
    }

    try {
      const token = await executeRecaptcha("login") // ✅ Generate reCAPTCHA token
      await login({ ...credentials, recaptchaToken: token })
      navigate('/jobs')
      toast.success("You've logged in successfully")
    } catch (err: any) {
      console.error('err!!!', err.response)
      if (err.response.status === 401) {
        toast.error('Invalid username or password')
      } else {
        toast.error(err.response.data)
      }
    }
  }

  async function handleDemoLogin(ev: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    ev.preventDefault()
    const demoUser: LoginCredentials = {
      userName: 'demoUser',
      password: '123',
      recaptchaToken: ''
    }
    try {
      await login(demoUser)
      navigate('/jobs')
      toast.success(`You've logged in successfully`)
    } catch (err) {
      console.log(err)
      toast.error(`invalid username or password`)
    }
  }

  const { userName, password } = credentials
  return (
    <>
      <Helmet>
        <title>Login - JobTracker</title>
        <meta name="description" content="Login to JobTracker to manage and track your job applications efficiently." />
      </Helmet>
      <AuthLayout>
        <form className='bg-white px-6 sm:px-10 py-10 rounded-2xl shadow-xl border border-slate-100'>
          <div className='mb-8'>
            <h1 className='text-3xl font-semibold text-slate-800'>Welcome back</h1>
            <p className='mt-2 text-slate-500'>Sign in to continue tracking your job search.</p>
          </div>

          <div className='mb-4'>
            <label htmlFor='userName' className='block mb-1.5 text-sm font-medium text-slate-700'>Username</label>
            <div className='relative'>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400"><path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" /></svg>
              <input id='userName' type="text" className={`w-full bg-slate-50 border rounded-xl py-2.5 pl-10 pr-3 outline-none transition focus:bg-white focus:ring-2 focus:ring-sky-400/40 focus:border-sky-400 ${errors.userName ? 'border-red-300' : 'border-slate-200'}`} placeholder="Enter your username" name='userName' value={userName} onChange={handleCredentialsChange} required />
            </div>
            {errors.userName && <p className='mt-1.5 text-sm text-red-500'>{errors.userName}</p>}
          </div>

          <div className='mb-6'>
            <label htmlFor='password' className='block mb-1.5 text-sm font-medium text-slate-700'>Password</label>
            <div className='relative'>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400"><path fillRule="evenodd" d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z" clipRule="evenodd" /></svg>
              <input id='password' type="password" className={`w-full bg-slate-50 border rounded-xl py-2.5 pl-10 pr-3 outline-none transition focus:bg-white focus:ring-2 focus:ring-sky-400/40 focus:border-sky-400 ${errors.password ? 'border-red-300' : 'border-slate-200'}`} placeholder="Enter your password" name='password' value={password} onChange={handleCredentialsChange} required />
            </div>
            {errors.password && <p className='mt-1.5 text-sm text-red-500'>{errors.password}</p>}
          </div>

          <button onClick={onLogin} className='w-full rounded-xl bg-sky-500 py-3 font-semibold text-white shadow-sm transition hover:bg-sky-600 active:scale-[0.99]'>Login</button>

          <div className='my-5 flex items-center gap-3'>
            <span className='h-px grow bg-slate-200' />
            <span className='text-xs uppercase tracking-wide text-slate-400'>or</span>
            <span className='h-px grow bg-slate-200' />
          </div>

          <button onClick={handleDemoLogin} className='w-full rounded-xl border-2 border-sky-400 py-3 font-semibold text-sky-500 transition hover:bg-sky-50 active:scale-[0.99]'>Try demo account</button>

          <p className='mt-6 text-center text-slate-500'>Not a member yet? <Link className='font-medium text-sky-500 hover:text-sky-600' to={'/createUser'}>Register</Link></p>
        </form>
      </AuthLayout>
    </>
  )
}