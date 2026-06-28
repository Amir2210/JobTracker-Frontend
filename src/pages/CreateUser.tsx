import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { signup, login } from '../store/actions/user.actions'
import { toast } from 'react-toastify'
import { useGoogleReCaptcha } from 'react-google-recaptcha-v3'
import { Helmet } from "react-helmet-async"
import { AuthLayout } from '../cmps/AuthLayout'
type EmptyCredentials = {
  fullName: string,
  userName: string,
  password: string,
  recaptchaToken: string
}

function getEmptyCredentials(): EmptyCredentials {
  return {
    fullName: '',
    userName: '',
    password: '',
    recaptchaToken: ''
  }
}

export function CreateUser() {
  const [credentials, setCredentials] = useState(getEmptyCredentials())
  const [errors, setErrors] = useState({ userName: '', password: '', fullName: '' })
  const navigate = useNavigate()
  const { executeRecaptcha } = useGoogleReCaptcha()

  function handleCredentialsChange(ev: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = ev.target
    let errorMessage = ''
    // Validation logic
    if (name === 'userName') {
      if (!/^[a-zA-Z0-9_]{3,15}$/.test(value)) {
        errorMessage = 'Username must be 3-15 characters (letters, numbers only).'
      }
    } else if (name === 'password') {
      if (!/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d_]{3,15}$/.test(value)) {
        errorMessage = 'Password must be 3-15 characters (letters, numbers Combine!).'
      }
    } else if (name === 'fullName') {
      if (!/^[A-Za-zÀ-ÖØ-öø-ÿ]{2,} [A-Za-zÀ-ÖØ-öø-ÿ]{2,}$/.test(value)) {
        errorMessage = 'Full name must be letters and a space between first and last name.'
      }
    }

    setErrors((prevErrors) => ({ ...prevErrors, [name]: errorMessage }))
    setCredentials((prevCredentials) => ({ ...prevCredentials, [name]: value }))
  }

  async function onSubmit(ev: React.FormEvent<HTMLFormElement>) {
    ev.preventDefault()
    if (errors.userName || errors.password || errors.fullName || !credentials.fullName || !credentials.userName || !credentials.password) {
      toast.error("Please correct the errors before submitting.")
      return
    }
    if (!executeRecaptcha) {
      toast.error("reCAPTCHA is not ready. Please try again.")
      return
    }

    try {
      const recaptchaToken = await executeRecaptcha("signup")
      const formData = new FormData(ev.target as HTMLFormElement)
      const fullName = formData.get('fullName') as string
      const userName = formData.get('userName') as string
      const password = formData.get('password') as string
      const newUser: EmptyCredentials = { fullName, userName, password, recaptchaToken }
      await signup(newUser)
      await login(newUser)
      navigate('/jobs')
      toast.success(`welcome ${fullName} 😀`)
    } catch (err) {
      toast.error(`failed to create user try again later`)

    }
  }

  const { userName, password, fullName } = credentials
  return (
    <>
      <Helmet>
        <title>Register - JobTracker</title>
        <meta name="description" content="Create an account on JobTracker to manage and track your job applications efficiently." />
      </Helmet>
      <AuthLayout>
        <form onSubmit={onSubmit} className='bg-white px-6 sm:px-10 py-10 rounded-2xl shadow-xl border border-slate-100'>
          <div className='mb-8'>
            <h1 className='text-3xl font-semibold text-slate-800'>Create account</h1>
            <p className='mt-2 text-slate-500'>Start organizing your job search in minutes.</p>
          </div>

          <div className='mb-4'>
            <label htmlFor='fullName' className='block mb-1.5 text-sm font-medium text-slate-700'>Full name</label>
            <div className='relative'>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400"><path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm-9 8c0-1 1-4 6-4s6 3 6 4v1H2v-1Z" /></svg>
              <input id='fullName' type="text" className={`w-full bg-slate-50 border rounded-xl py-2.5 pl-10 pr-3 outline-none transition focus:bg-white focus:ring-2 focus:ring-sky-400/40 focus:border-sky-400 ${errors.fullName ? 'border-red-300' : 'border-slate-200'}`} placeholder="John Doe" value={fullName} name='fullName' onChange={handleCredentialsChange} required />
            </div>
            {errors.fullName && <p className='mt-1.5 text-sm text-red-500'>{errors.fullName}</p>}
          </div>

          <div className='mb-4'>
            <label htmlFor='userName' className='block mb-1.5 text-sm font-medium text-slate-700'>Username</label>
            <div className='relative'>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400"><path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" /></svg>
              <input id='userName' type="text" className={`w-full bg-slate-50 border rounded-xl py-2.5 pl-10 pr-3 outline-none transition focus:bg-white focus:ring-2 focus:ring-sky-400/40 focus:border-sky-400 ${errors.userName ? 'border-red-300' : 'border-slate-200'}`} placeholder="Choose a username" name='userName' value={userName} onChange={handleCredentialsChange} required />
            </div>
            {errors.userName && <p className='mt-1.5 text-sm text-red-500'>{errors.userName}</p>}
          </div>

          <div className='mb-6'>
            <label htmlFor='password' className='block mb-1.5 text-sm font-medium text-slate-700'>Password</label>
            <div className='relative'>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400"><path fillRule="evenodd" d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z" clipRule="evenodd" /></svg>
              <input id='password' type="password" className={`w-full bg-slate-50 border rounded-xl py-2.5 pl-10 pr-3 outline-none transition focus:bg-white focus:ring-2 focus:ring-sky-400/40 focus:border-sky-400 ${errors.password ? 'border-red-300' : 'border-slate-200'}`} placeholder="Create a password" name='password' value={password} onChange={handleCredentialsChange} required />
            </div>
            {errors.password && <p className='mt-1.5 text-sm text-red-500'>{errors.password}</p>}
          </div>

          <button className='w-full rounded-xl bg-sky-500 py-3 font-semibold text-white shadow-sm transition hover:bg-sky-600 active:scale-[0.99]'>Create account</button>

          <p className='mt-6 text-center text-slate-500'>Already a member? <Link className='font-medium text-sky-500 hover:text-sky-600' to={'/login'}>Login</Link></p>
        </form>
      </AuthLayout>
    </>
  )
}