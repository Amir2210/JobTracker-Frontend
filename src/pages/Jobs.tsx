import { useSelector } from 'react-redux'
import { Navbar } from '../cmps/Navbar'
import { UserModule } from '../types/user.types'
import { Job } from '../types/job.types'
import { MdOutlinePendingActions } from "react-icons/md"
import { FaLocationArrow } from "react-icons/fa"
import { FaSuitcase } from "react-icons/fa"




export function Jobs() {
  const userJobs: Job[] | undefined = useSelector((storeState: UserModule) => storeState.userModule.loggedInUser?.jobs)
  function statusClass(status: string): string {
    if (status === 'pending') {
      return 'bg-orange-200 text-orange-600 shadow-lg shadow-orange-200/50'
    } else if (status === 'interview') {
      return 'bg-blue-200 text-blue-600 shadow-lg shadow-blue-200/50'
    } else {
      return 'bg-red-200 text-red-600 shadow-lg shadow-red-200/50'
    }
  }
  return (
    <section >
      <Navbar />
      <div className='bg-zinc-100 h-full w-full'>
        <div className='small-container sm:big-container sm:mt-4 sm:py-4 py-2  '>
          <h1 className='text-2xl capitalize font-medium'>{userJobs?.length} {userJobs?.length === 1 ? 'job' : 'jobs'} found</h1>
          <div className='grid sm:grid-cols-2 gap-5 mt-4'>
            {userJobs?.map(job => <article key={job._id} className='sm:shadow-xl sm:mt-4 sm:py-4 py-2 px-2 rounded-lg bg-white'>
              <div className='flex gap-8 border-solid border-indigo-100 border-b py-3 px-3'>
                <div className='text-4xl bg-sky-400 text-white font-mono font-bold size-14 flex justify-center items-center rounded-lg'><MdOutlinePendingActions /></div>
                <div>
                  <h1 className='text-sky-950 text-xl capitalize mb-1'>{job.position}</h1>
                  <h2 className='text-slate-500 capitalize'>{job.company}</h2>
                </div>
              </div>
              <div className='flex gap-16 sm:gap-32 py-3 px-3'>
                <div className='flex items-center gap-5'>
                  <FaLocationArrow className='text-slate-400' />
                  <p className='text-sky-950 text-lg capitalize'>{job.jobLocation}</p>
                </div>
                <div className='flex items-center gap-5'>
                  <FaSuitcase className='text-slate-400' />
                  <p className='text-sky-950 text-lg capitalize'>{job.jobLocation}</p>
                </div>
              </div>
              <div className='flex gap-32 py-3 px-3'>
                <div className='flex items-center gap-5'>
                  <p className={`${statusClass(job.status)} p-2 font-medium rounded-sm`}>{job.status}</p>
                </div>
                <div className='flex items-center gap-5'>

                </div>
              </div>
            </article>)}
          </div>
        </div>
      </div>
    </section>
  )
}