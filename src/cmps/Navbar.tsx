import { useSelector } from 'react-redux'
import { NavLinks } from './NavLinks'
import { UserModule } from '../types/types'
import { logout } from '../store/actions/user.actions'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import { CgProfile } from "react-icons/cg";


export function Navbar() {
  const user = useSelector((storeState: UserModule) => storeState.userModule.loggedInUser)
  const navigate = useNavigate()

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

  return (
    <nav className='small-container sm:big-container'>
      <div className="navbar bg-base-100">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h7" /></svg>
            </div>
            <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
              <NavLinks />
            </ul>
          </div>
        </div>
        <div className="navbar-center">
          <a className=" text-2xl sm:text-3xl font-mono font-bold">JobTracker</a>
        </div>
        <div className="navbar-end hidden sm:flex">
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
        <div className="navbar-end flex sm:hidden">
          <ul className="menu menu-horizontal px-1">
            <li>
              <details>
                <summary className='bg-sky-400 text-white text-lg hover:bg-sky-600'>
                  <CgProfile className='text-2xl' />
                </summary>
                <ul className="p-2 bg-base-100 rounded-t-none">
                  <li><button onClick={onLogout}>logout</button></li>
                </ul>
              </details>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  )
}