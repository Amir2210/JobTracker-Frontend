import { useSelector } from 'react-redux'
import { Navbar } from '../cmps/Navbar'
import { UserModule } from '../types/user.types'
import { Job } from '../types/job.types'
import { MdOutlinePendingActions } from "react-icons/md"
import { AiOutlineSchedule } from "react-icons/ai"
import { FaBug } from "react-icons/fa"
import { DoughnutChart } from '../cmps/DoughnutChart'

export function Stats() {
  const userJobs: Job[] | undefined = useSelector((storeState: UserModule) => storeState.userModule.loggedInUser?.jobs)
  const pendingJobs = userJobs?.filter(job => job.status === 'pending')
  const interviewJobs = userJobs?.filter(job => job.status === 'interview')
  const declinedJobs = userJobs?.filter(job => job.status === 'declined')
  return (
    <section>
      <Navbar />
      <div className='bg-zinc-100 min-h-screen'>
        <div className='small-container sm:big-container sm:mt-4 sm:py-4 py-2 '>
          <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5'>
            <div className='sm:shadow-xl sm:mt-4 p-8 rounded-lg bg-white border-b-4 border-orange-400'>
              <div className='flex items-center justify-between'>
                <p className='text-5xl'>{pendingJobs?.length}</p>
                <div className='bg-orange-200 text-orange-600 p-2 rounded-md'>
                  <MdOutlinePendingActions className='text-5xl' />
                </div>
              </div>
              <p className='mt-4 font-mono text-2xl text-sky-950'>Pending jobs</p>
            </div>
            <div className='sm:shadow-xl sm:mt-4 p-8 rounded-lg bg-white border-b-4 border-blue-600'>
              <div className='flex items-center justify-between'>
                <p className='text-5xl'>{interviewJobs?.length}</p>
                <div className='bg-blue-200 text-blue-600 p-2 rounded-md'>
                  <AiOutlineSchedule className='text-5xl' />
                </div>
              </div>
              <p className='mt-4 font-mono text-2xl text-sky-950'>Interviews Scheduled</p>
            </div>
            <div className='sm:shadow-xl sm:mt-4 p-8 rounded-lg bg-white border-b-4 border-red-600'>
              <div className='flex items-center justify-between'>
                <p className='text-5xl'>{declinedJobs?.length}</p>
                <div className='bg-red-200 text-red-600 p-2 rounded-md'>
                  <FaBug className='text-5xl' />
                </div>
              </div>
              <p className='mt-4 font-mono text-2xl text-sky-950'>Jobs Declined</p>
            </div>
          </div>
          <div className='flex justify-center my-8 sm:h-72'>
            <DoughnutChart
              pendingJobs={pendingJobs?.length || 0}
              interviewJobs={interviewJobs?.length || 0}
              declinedJobs={declinedJobs?.length || 0}
            />
          </div>
        </div>
      </div>
    </section>
  )
}