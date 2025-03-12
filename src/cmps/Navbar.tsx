import { useSelector } from 'react-redux'
import { NavLinks } from './NavLinks'
import { UserModule } from '../types/user.types'
import { logout } from '../store/actions/user.actions'
import { toast } from 'react-toastify'
import { Link, useNavigate } from 'react-router-dom'
import { CgProfile } from "react-icons/cg";
import { MdSunny } from "react-icons/md"
import { FaMoon } from "react-icons/fa"
import { useEffect, useState } from 'react'

interface theme {
  light: string
  dark: string
}

const themes: theme = {
  light: 'light',
  dark: 'dark'
}

function getThemeFromLocal() {
  return localStorage.getItem('theme') || themes.light
}


export function Navbar() {
  const [theme, setTheme] = useState(getThemeFromLocal())
  const user = useSelector((storeState: UserModule) => storeState.userModule.loggedInUser)
  const navigate = useNavigate()

  function handleTheme() {
    const { dark, light } = themes
    const newTheme = theme === light ? dark : light
    setTheme(newTheme)
  }

  async function onLogout() {
    try {
      await logout()
      toast.success(`logged out successfully`)
      navigate('/')
    } catch (err) {
      console.log('err:', err)
      toast.error(`failed to logged out`)
    }
  }

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    localStorage.setItem('theme', theme)
  }, [theme])

  return (
    <nav className="navbar bg-base-100 sticky top-0 px-8 z-10 sm:static small-container sm:big-container">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost btn-circle" aria-label='Toggle menu'>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h7" /></svg>
          </div>
          <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[100] p-2 shadow bg-base-100 rounded-box w-52">
            <NavLinks />
          </ul>
        </div>
      </div>
      <div className="navbar-center mx-2">
        <Link to={'/jobs'} className=" text-2xl sm:text-3xl font-mono font-bold">JobTracker</Link>
      </div>
      <div className="navbar-end hidden sm:flex gap-2">
        <label className='swap swap-rotate'>
          <input type="checkbox" onChange={handleTheme} aria-label="Toggle light/dark theme" />
          <MdSunny className='swap-on h-6 w-6 ' />
          <FaMoon className='swap-off h-6 w-6 ' />
        </label>
        <ul className="menu menu-horizontal px-1">
          <li>
            <details>
              <summary className='bg-sky-400 text-white text-lg hover:bg-sky-600'>
                <CgProfile className='text-2xl' />
                {user?.fullName}
              </summary>
              <ul className="p-2 bg-base-100 rounded-t-none">
                <li><button onClick={onLogout}>logout</button></li>
              </ul>
            </details>
          </li>
        </ul>
      </div>
      <div className="navbar-end flex sm:hidden gap-2">
        <ul className="menu menu-horizontal px-1">
          <li>
            <details>
              <summary className='bg-sky-400 text-white text-lg hover:bg-sky-600'>
                <CgProfile className='text-2xl' />
              </summary>
              <ul className="p-2 bg-base-100 rounded-t-none ">
                <li><button onClick={onLogout}>logout</button></li>
              </ul>
            </details>
          </li>
        </ul>
        <label className='swap swap-rotate'>
          <input type="checkbox" onChange={handleTheme} aria-label="Toggle light/dark theme" />
          <MdSunny className='swap-on h-6 w-6 ' />
          <FaMoon className='swap-off h-6 w-6 ' />
        </label>
      </div>
    </nav>
  )
}