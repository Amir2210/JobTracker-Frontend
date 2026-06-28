import { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { FaCheck } from 'react-icons/fa'

type AuthLayoutProps = {
  children: ReactNode
}

const BENEFITS = [
  'Track every application in one place',
  'Follow each job through every stage',
  'Visualize progress with stats & calendar',
]

export function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div className='min-h-screen grid md:grid-cols-2'>
      {/* Branding panel */}
      <div className='hidden md:flex flex-col justify-center px-12 lg:px-20 bg-gradient-to-br from-sky-400 to-sky-600 text-white animate-fade-in'>
        <Link to={'/'} className='flex items-center mb-10'>
          <div className='text-4xl bg-white text-sky-500 font-mono font-bold size-14 flex justify-center items-center rounded-lg'>J</div>
          <div className='ml-4 text-3xl font-bold tracking-wide'>JobTracker</div>
        </Link>
        <h1 className='text-4xl font-bold leading-tight mb-4'>Organize your job search the smart way</h1>
        <p className='text-lg opacity-90 mb-8'>Stay on top of every opportunity, from applied to offer.</p>
        <ul className='flex flex-col gap-4'>
          {BENEFITS.map((benefit) => (
            <li key={benefit} className='flex items-center gap-3'>
              <span className='bg-white/20 rounded-full p-1.5'><FaCheck className='text-sm' /></span>
              {benefit}
            </li>
          ))}
        </ul>
      </div>

      {/* Form panel */}
      <div className='flex flex-col justify-center items-center bg-zinc-100 px-6 py-10'>
        <Link to={'/'} className='flex justify-center items-center mb-6 md:hidden'>
          <div className='text-4xl bg-sky-400 text-white font-mono font-bold size-14 flex justify-center items-center rounded-lg'>J</div>
          <div className='ml-4 text-3xl font-bold tracking-wide text-sky-400'>JobTracker</div>
        </Link>
        <div className='w-full max-w-md animate-fade-up'>
          {children}
        </div>
      </div>
    </div>
  )
}
