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

  const themeToggle = (
    <label className='swap swap-rotate btn btn-ghost btn-circle'>
      <input type="checkbox" onChange={handleTheme} checked={theme === themes.dark} aria-label="Toggle light/dark theme" />
      <MdSunny className='swap-on h-5 w-5' />
      <FaMoon className='swap-off h-5 w-5' />
    </label>
  )

  const profileMenu = (
    <div className="dropdown dropdown-end">
      <div tabIndex={0} role="button" className="btn bg-sky-500 hover:bg-sky-600 text-white border-none gap-2 capitalize">
        <CgProfile className='text-xl' />
        <span className='hidden sm:inline'>{user?.fullName}</span>
      </div>
      <ul tabIndex={0} className="dropdown-content menu mt-2 z-[100] p-2 shadow-lg bg-base-100 rounded-box w-44 border border-base-300">
        <li><button onClick={onLogout} className='capitalize'>logout</button></li>
      </ul>
    </div>
  )

  return (
    <nav className="sticky top-0 z-30 bg-base-100/90 backdrop-blur border-b border-base-300 shadow-sm">
      <div className="small-container sm:big-container flex items-center justify-between gap-2 py-2">
        {/* Left: mobile menu + logo */}
        <div className="flex items-center gap-1">
          <div className="dropdown md:hidden">
            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle" aria-label='Toggle menu'>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h7" /></svg>
            </div>
            <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[100] p-2 gap-1 shadow-lg bg-base-100 rounded-box w-52 border border-base-300">
              <NavLinks />
            </ul>
          </div>
          <Link to={'/jobs'} className="flex items-center gap-2">
            <div className="text-2xl bg-sky-500 text-white font-mono font-bold size-9 flex justify-center items-center rounded-lg">J</div>
            <span className="text-xl sm:text-2xl font-bold tracking-wide hidden sm:inline">JobTracker</span>
          </Link>
        </div>

        {/* Center: desktop nav */}
        <ul className="menu menu-horizontal hidden md:flex gap-1">
          <NavLinks />
        </ul>

        {/* Right: theme + profile */}
        <div className="flex items-center gap-1 sm:gap-2">
          {themeToggle}
          {profileMenu}
        </div>
      </div>
    </nav>
  )
}
