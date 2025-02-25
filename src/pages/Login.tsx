import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { login } from '../store/actions/user.actions'
import { toast } from 'react-toastify'
import { LoginCredentials } from '../types/user.types'
import { useGoogleReCaptcha } from 'react-google-recaptcha-v3'
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
  // const [captchaToken, setCaptchaToken] = useState<string | null>(null)
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
      // setCaptchaToken(token)
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

  async function handleDemoLogin() {
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
    <section className='bg-zinc-100 h-screen flex flex-col justify-center items-center px-10'>
      <form className='sm:bg-white sm:px-28 py-8 rounded-lg sm:border-solid sm:border-y-4 sm:border-t-sky-400 sm:shadow-xl'>
        <Link to={'/'} className=' flex justify-center items-center'>
          <div className=' flex text-4xl bg-sky-400 text-white font-mono font-bold size-14 justify-center items-center rounded-lg'>J</div>
          <div className=' ml-4 text-3xl font-bold tracking-wide text-sky-400'>JobTracker</div>
        </Link>
        <div className='flex justify-center items-center'>
          <h1 className=' text-3xl my-4 capitalize'>login</h1>
        </div>
        <label className="input input-bordered flex items-center gap-2 my-3 w-full bg-white">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70"><path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" /></svg>
          <input type="text" className="grow " placeholder="Username" name='userName' value={userName} onChange={handleCredentialsChange} required />
        </label>
        <p className={`text-red-400 sm:py-3 ${errors.userName && 'py-0'}`}>{errors.userName}</p>
        <label className="input input-bordered flex items-center gap-2 my-3 w-full bg-white">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70"><path fillRule="evenodd" d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z" clipRule="evenodd" /></svg>
          <input type="password" className="grow" placeholder="Password" name='password' value={password} onChange={handleCredentialsChange} required />
        </label>
        <p className={`text-red-400 sm:py-3 ${errors.password && 'py-0'}`}>{errors.password}</p>
        <button onClick={onLogin} className='btn bg-white border-solid border-2 border-sky-400 text-sky-400 hover:bg-sky-400 hover:text-white hover:border-white  capitalize text-2xl w-full my-3'>Login</button>
        <button onClick={handleDemoLogin} className='btn  bg-sky-400 capitalize text-2xl w-full my-3 text-white hover:bg-sky-600 border-none'>demo Login</button>
        <span className='text-lg'>Not a member yet? <Link className='capitalize text-sky-400 font-medium' to={'/createUser'}> register</Link></span>
      </form>
    </section>
  )
}