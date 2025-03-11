
import { Link } from "react-router-dom"
import { Helmet } from "react-helmet-async";
export function HomeIndex() {
  return (
    <>
      <Helmet>
        <title>Job Tracker - Organize Your Job Search</title>
        <meta
          name="description"
          content="Job Tracker helps you streamline your job search by organizing applications and tracking your progress efficiently."
        />
      </Helmet>
      <section className=' bg-zinc-100 h-screen'>
        <div className="small-container sm:big-container">
          <div className='navbar py-6'>
            <div className='text-4xl bg-sky-400 text-white font-mono font-bold size-14 justify-center items-center rounded-lg'>J</div>
            <div className=' ml-4 text-3xl font-bold tracking-wide text-sky-400'>JobTracker</div>
          </div>
          <div className='grid sm:grid-cols-2 gap-10 mt-5 sm:mt-20 text-slate-950'>
            <div>
              <h1 className='text-5xl sm:text-6xl font-bold tracking-wide capitalize mb-6'>job <span className='text-sky-400'>tracking</span> app</h1>
              <p className='sm:text-xl tracking-widest mb-3'>Job Tracker streamlines your job search by efficiently organizing a watchlist. Easily manage the jobs you've applied for.</p>
              <Link to={'/login'} className='btn text-white text-lg bg-sky-400 capitalize hover:bg-sky-600 border-none'>login / register</Link>
            </div>
            <div>
              <img className='size-48 sm:size-full' src="https://res.cloudinary.com/dxm0sqcfp/image/upload/v1715154175/job%20tracker/ocfxopyi3lshmxzmucwd.svg" alt="" />
            </div>
          </div>
        </div>
      </section>
    </>
  )
}