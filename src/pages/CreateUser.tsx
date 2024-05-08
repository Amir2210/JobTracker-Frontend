import { Link } from 'react-router-dom';
export function CreateUser() {
  return (
    <section className='bg-zinc-100 h-screen flex flex-col justify-center items-center px-10'>
      <form className='sm:bg-white px-11 py-8 rounded-lg sm:border-solid sm:border-y-4 sm:border-t-sky-400 sm:shadow-xl'>
        <div className=' flex justify-center items-center'>
          <div className=' flex text-4xl bg-sky-400 text-white font-mono font-bold size-14 justify-center items-center rounded-lg'>J</div>
          <div className=' ml-4 text-3xl font-bold tracking-wide text-sky-400'>JobTracker</div>
        </div>
        <div className='flex justify-center items-center'>
          <h1 className=' text-3xl my-4 capitalize'>register</h1>
        </div>
        <label className="input input-bordered flex items-center gap-2 my-3 w-full">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70"><path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" /></svg>
          <input type="text" className="grow" placeholder="Username" name='username' required />
        </label>
        <label className="input input-bordered flex items-center gap-2 my-3 w-full">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70"><path fillRule="evenodd" d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z" clipRule="evenodd" /></svg>
          <input type="password" className="grow" placeholder="Password" name='password' required />
        </label>
        <label className="input input-bordered flex items-center gap-2 my-3 w-full">
          <input type="text" className="grow" placeholder="Full name" name='fullname' required />
        </label>
        <button className='btn bg-white border-solid border-2 border-sky-400 text-sky-400 hover:bg-sky-400 hover:text-white hover:border-white  capitalize text-2xl w-full my-3'>Login</button>
        <button className='btn  bg-sky-400 capitalize text-2xl w-full my-3 text-white hover:bg-sky-600'>demo Login</button>
        <span className='text-lg'>Already a member? <Link className=' capitalize text-sky-400 font-medium' to={'/login'}> login</Link></span>
      </form>
    </section>
  )
}