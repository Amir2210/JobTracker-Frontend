import { useSelector } from 'react-redux'
import { Navbar } from '../cmps/Navbar'
import { UserModule } from '../types/user.types'
import { Job } from '../types/job.types'
import { MdOutlinePendingActions } from "react-icons/md"
import { AiOutlineSchedule } from "react-icons/ai"
import { FaBug } from "react-icons/fa"
import { ImProfile } from "react-icons/im";
import { FaGhost } from "react-icons/fa6";
import { DoughnutChart } from '../cmps/DoughnutChart'
import { MdContactPhone } from "react-icons/md"
import { FaReact } from "react-icons/fa"
import { Helmet } from "react-helmet-async"
export function Stats() {
  const userJobs: Job[] | undefined = useSelector((storeState: UserModule) => storeState.userModule.loggedInUser?.allJobs)
  const pendingJobs = userJobs?.filter(job => job.status === 'pending')
  const interviewJobs = userJobs?.filter(job => job.status === 'interview')
  const declinedJobs = userJobs?.filter(job => job.status === 'declined')
  const hrInterviewJobs = userJobs?.filter(job => job.status === 'HR Interview')
  const ghostingJobs = userJobs?.filter(job => job.status === 'Ghosting')
  const phoneCallJobs = userJobs?.filter(job => job.status === 'phone call')
  const codeAssignmentJobs = userJobs?.filter(job => job.status === 'code assignment')
  return (
    <>
      <Helmet>
        <title>Job Statistics - JobTracker</title>
        <meta name="description" content="View job statistics including pending, interviews, declined, HR interviews, and ghosting job applications." />
      </Helmet>
      <section>
        <Navbar />
        <div className='bg-base-200 min-h-screen'>
          <div className='small-container sm:big-container sm:mt-4 sm:py-4 py-2 '>
            <div className='grid grid-cols-1 sm:grid-cols-2 gap-5'>
              <div className='sm:shadow-xl sm:mt-4 p-8 rounded-lg bg-white border-b-4 border-orange-400'>
                <div className='flex items-center justify-between'>
                  <p className='text-5xl text-orange-600'>{pendingJobs?.length}</p>
                  <div className='bg-orange-200 text-orange-600 p-2 rounded-md'>
                    <MdOutlinePendingActions className='text-5xl' />
                  </div>
                </div>
                <p className='mt-4 font-mono text-2xl text-sky-950'>Pending jobs</p>
              </div>
              <div className='sm:shadow-xl sm:mt-4 p-8 rounded-lg bg-white border-b-4 border-blue-600'>
                <div className='flex items-center justify-between'>
                  <p className='text-5xl text-blue-600'>{interviewJobs?.length}</p>
                  <div className='bg-blue-200 text-blue-600 p-2 rounded-md'>
                    <AiOutlineSchedule className='text-5xl' />
                  </div>
                </div>
                <p className='mt-4 font-mono text-2xl text-sky-950'>Interviews Scheduled</p>
              </div>
              <div className='sm:shadow-xl sm:mt-4 p-8 rounded-lg bg-white border-b-4 border-red-600'>
                <div className='flex items-center justify-between'>
                  <p className='text-5xl text-red-600'>{declinedJobs?.length}</p>
                  <div className='bg-red-200 text-red-600 p-2 rounded-md'>
                    <FaBug className='text-5xl' />
                  </div>
                </div>
                <p className='mt-4 font-mono text-2xl text-sky-950'>Jobs Declined</p>
              </div>


              <div className='sm:shadow-xl sm:mt-4 p-8 rounded-lg bg-white border-b-4 border-purple-600'>
                <div className='flex items-center justify-between'>
                  <p className='text-5xl text-purple-600'>{hrInterviewJobs?.length}</p>
                  <div className='bg-purple-200 text-purple-600 p-2 rounded-md'>
                    <ImProfile className='text-5xl' />
                  </div>
                </div>
                <p className='mt-4 font-mono text-2xl text-sky-950'>HR Interviews</p>
              </div>
              <div className='sm:shadow-xl  sm:mt-4 p-8 rounded-lg bg-white border-b-4 border-pink-600'>
                <div className='flex items-center justify-between'>
                  <p className='text-5xl text-pink-600'>{phoneCallJobs?.length}</p>
                  <div className='bg-pink-200 text-pink-600 p-2 rounded-md'>
                    <MdContactPhone className='text-5xl' />
                  </div>
                </div>
                <p className='mt-4 font-mono text-2xl text-sky-950'>Phone calls</p>
              </div>
              <div className='sm:shadow-xl  sm:mt-4 p-8 rounded-lg bg-white border-b-4 border-emerald-600'>
                <div className='flex items-center justify-between'>
                  <p className='text-5xl text-emerald-600'>{codeAssignmentJobs?.length}</p>
                  <div className='bg-emerald-200 text-emerald-600 p-2 rounded-md'>
                    <FaReact className='text-5xl' />
                  </div>
                </div>
                <p className='mt-4 font-mono text-2xl text-sky-950'>code assignment</p>
              </div>
              <div className='sm:shadow-xl sm:col-span-2   sm:mt-4 p-8 rounded-lg bg-white border-b-4 border-stone-600'>
                <div className='flex items-center justify-between'>
                  <p className='text-5xl text-stone-600'>{ghostingJobs?.length}</p>
                  <div className='bg-stone-200 text-stone-600 p-2 rounded-md'>
                    <FaGhost className='text-5xl' />
                  </div>
                </div>
                <p className='mt-4 font-mono text-2xl text-sky-950'>Ghosting jobs</p>
              </div>
            </div>
            <div className='flex justify-center my-8 sm:h-72 chart-txt-color'>
              <DoughnutChart
                pendingJobs={pendingJobs?.length || 0}
                interviewJobs={interviewJobs?.length || 0}
                declinedJobs={declinedJobs?.length || 0}
                hrInterviewJobs={hrInterviewJobs?.length || 0}
                ghostingJobs={ghostingJobs?.length || 0}
                phoneCallJobs={phoneCallJobs?.length || 0}
                codeAssignmentJobs={codeAssignmentJobs?.length || 0}
              />
            </div>
          </div>
        </div>
      </section>
    </>
  )
}