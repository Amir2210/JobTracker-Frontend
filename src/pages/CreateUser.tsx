import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { signup, login } from '../store/actions/user.actions'
import { toast } from 'react-toastify'

type EmptyCredentials = {
  fullName: string,
  userName: string,
  password: string,
}

function getEmptyCredentials(): EmptyCredentials {
  return {
    fullName: '',
    userName: '',
    password: '',
  }
}

export function CreateUser() {
  const [credentials, setCredentials] = useState(getEmptyCredentials())
  const [errors, setErrors] = useState({ userName: '', password: '', fullName: '' })
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
    try {
      const formData = new FormData(ev.target as HTMLFormElement)
      const fullName = formData.get('fullName') as string
      const userName = formData.get('userName') as string
      const password = formData.get('password') as string
      const newUser: EmptyCredentials = { fullName, userName, password }
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
    <section className='bg-zinc-100 h-screen flex flex-col justify-center items-center px-10'>
      <form onSubmit={onSubmit} className='sm:bg-white sm:min-w-[512px] px-5  py-8 rounded-lg sm:border-solid sm:border-y-4 sm:border-t-sky-400 sm:shadow-xl'>
        <Link to={'/'} className=' flex justify-center items-center'>
          <div className=' flex text-4xl bg-sky-400 text-white font-mono font-bold size-14 justify-center items-center rounded-lg'>J</div>
          <div className=' ml-4 text-3xl font-bold tracking-wide text-sky-400'>JobTracker</div>
        </Link>
        <div className='flex justify-center items-center'>
          <h1 className=' text-3xl my-4 capitalize'>register</h1>
        </div>
        <label className="input input-bordered flex items-center gap-2 my-3 w-full bg-white">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70"><path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" /></svg>
          <input type="text" className="grow" placeholder="Username" name='userName' value={userName} onChange={handleCredentialsChange} required />
        </label>
        <p className={`text-red-400 sm:py-3 ${errors.userName && 'py-0'}`}>{errors.userName}</p>
        <label className="input input-bordered flex items-center gap-2 my-3 w-full bg-white">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70"><path fillRule="evenodd" d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z" clipRule="evenodd" /></svg>
          <input type="password" className="grow" placeholder="Password" name='password' value={password} onChange={handleCredentialsChange} required />
        </label>
        <p className={`text-red-400 sm:py-3 ${errors.password && 'py-0'}`}>{errors.password}</p>
        <label className="input input-bordered flex items-center gap-2 my-3 w-full bg-white">
          <input type="text" className="grow" placeholder="Full name" value={fullName} name='fullName' onChange={handleCredentialsChange} required />
        </label>
        <p className={`text-red-400 sm:py-3 ${errors.fullName && 'py-0'}`}>{errors.fullName}</p>
        <button className='btn bg-white border-solid border-2 border-sky-400 text-sky-400 hover:bg-sky-400 hover:text-white hover:border-white  capitalize text-2xl w-full my-3'>register</button>
        <span className='text-lg'>Already a member? <Link className=' capitalize text-sky-400 font-medium' to={'/login'}> login</Link></span>
      </form>
    </section>
  )
}