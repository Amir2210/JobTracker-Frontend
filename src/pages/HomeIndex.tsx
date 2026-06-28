import { Link } from "react-router-dom"
import { Helmet } from "react-helmet-async"
import { HomeShowcase } from "../cmps/HomeShowcase"
import { HowItWorks } from "../cmps/HowItWorks"
import { statusClass, statusImg, statusImgBgColor } from "../utils/status.util"

const HERO_JOBS = [
  { position: 'Frontend Developer', company: 'Acme Inc', status: 'interview' },
  { position: 'React Engineer', company: 'Globex', status: 'pending' },
  { position: 'UI Developer', company: 'Initech', status: 'HR Interview' },
]

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

      <main className='bg-zinc-100 min-h-screen'>
        {/* Top bar */}
        <div className='small-container sm:big-container'>
          <div className='navbar py-6 flex justify-between'>
            <div className='flex items-center'>
              <div className='text-4xl bg-sky-400 text-white font-mono font-bold size-14 flex justify-center items-center rounded-lg'>J</div>
              <div className='ml-4 text-3xl font-bold tracking-wide text-sky-400'>JobTracker</div>
            </div>
            <Link to={'/login'} className='btn bg-white border-solid border-2 border-sky-400 text-sky-400 hover:bg-sky-400 hover:text-white hover:border-white capitalize'>login</Link>
          </div>
        </div>

        {/* Hero */}
        <section className='small-container sm:big-container'>
          <div className='grid lg:grid-cols-2 gap-10 items-center mt-6 sm:mt-12 pb-16 text-slate-950'>
            <div>
              <h1 className='text-4xl sm:text-6xl font-bold tracking-wide capitalize mb-6'>
                Track your <span className='text-sky-400'>job search</span> the smart way
              </h1>
              <p className='sm:text-xl tracking-wide mb-8 text-slate-600'>
                JobTracker keeps every application in one place. Log jobs, follow each one through every stage,
                and visualize your progress with analytics and a calendar - so nothing slips through the cracks.
              </p>
              <div className='flex flex-wrap gap-4'>
                <Link to={'/login'} className='btn text-white text-lg bg-sky-400 capitalize hover:bg-sky-600 border-none'>get started</Link>
                <Link to={'/createUser'} className='btn text-lg bg-white border-2 border-sky-400 text-sky-400 capitalize hover:bg-sky-400 hover:text-white hover:border-white'>create account</Link>
              </div>
            </div>

            {/* Mini dashboard preview */}
            <div className='rounded-2xl bg-white shadow-2xl border border-indigo-100 p-5'>
              <div className='flex gap-2 mb-4'>
                <span className='size-3 rounded-full bg-red-300' />
                <span className='size-3 rounded-full bg-amber-300' />
                <span className='size-3 rounded-full bg-green-300' />
              </div>
              <div className='flex flex-col gap-3'>
                {HERO_JOBS.map((job) => (
                  <div key={job.position} className='flex items-center gap-3 rounded-lg border border-indigo-50 p-3'>
                    <div className={`text-lg text-white size-10 flex justify-center items-center rounded-lg ${statusImgBgColor(job.status)}`}>
                      {statusImg(job.status)}
                    </div>
                    <div className='grow'>
                      <p className='capitalize font-medium text-sm'>{job.position}</p>
                      <p className='capitalize text-xs text-slate-500'>{job.company}</p>
                    </div>
                    <span className={`${statusClass(job.status)} btn btn-xs font-medium rounded-md cursor-auto capitalize`}>{job.status}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <HomeShowcase />
        <HowItWorks />

        {/* Closing CTA */}
        <section className='bg-sky-400 py-16'>
          <div className='small-container sm:big-container text-center text-white'>
            <h2 className='text-3xl sm:text-4xl font-bold capitalize mb-4'>Ready to organize your job search?</h2>
            <p className='text-lg mb-8 opacity-90'>Start tracking your applications in minutes.</p>
            <Link to={'/login'} className='btn text-lg bg-white text-sky-500 capitalize hover:bg-zinc-100 border-none'>get started for free</Link>
          </div>
        </section>
      </main>
    </>
  )
}
