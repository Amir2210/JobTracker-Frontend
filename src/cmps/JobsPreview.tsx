//types
import { Job } from '../types/job.types'
//utils
import { formatDate } from '../utils/util'
import { statusClass, statusImg, statusImgBgColor } from '../utils/status.util'
//icons
import { FaStar } from "react-icons/fa";
import { FaSuitcase } from "react-icons/fa"
import { FaCalendarAlt } from "react-icons/fa";
import { FaLocationArrow } from "react-icons/fa"
import { CiStar } from "react-icons/ci";
//react
import { RefObject, useState } from 'react';
import { Link } from 'react-router-dom';
//components
import { JobDetails } from './JobDetails';
//actions
import { deleteJob, editJob } from '../store/actions/user.actions';
import { toast } from 'react-toastify';
//interface
interface JobsPreviewProps {
  job: Job
  index: number
  userJobs?: Job[] | undefined
  lastJobRef?: RefObject<HTMLDivElement>
  isDemoUser: boolean
}

async function onDeleteJob(job_id: string) {
  try {
    deleteJob(job_id)
    toast.success('Job deleted successfully')
    // window.location.reload()
  } catch (error) {
    console.log(error)
    toast.error('Unfortunately, we could not delete a job')
  }
}

export function JobsPreview({ job, index, userJobs, lastJobRef, isDemoUser }: JobsPreviewProps) {
  const [isFavorite, setIsFavorite] = useState(job.isFavorite)
  const [isDetailsOpen, setIsDetailsOpen] = useState(false)

  async function onChangeFavorite(job: Job) {
    try {
      editJob({ ...job, isFavorite: !isFavorite })
      setIsFavorite(!isFavorite)
    } catch (error) {
      console.log('error:', error)
    }
  }

  const jobsList = userJobs
  const isLastJob = index === (jobsList?.length ?? 0) - 1;

  return (
    <article ref={isLastJob && (userJobs && userJobs.length > 3) ? lastJobRef : null} key={job._id} className='sm:mt-4 sm:py-4 py-2 px-2 rounded-lg bg-base-100 h-fit'>
      <div className='flex gap-8 border-solid border-indigo-100 border-b py-3 px-3'>
        <div className={`text-4xl text-white font-mono font-bold size-14 flex justify-center items-center rounded-lg ${statusImgBgColor(job.status)}`}>{statusImg(job.status)}</div>
        <button onClick={() => setIsDetailsOpen(true)} className='text-left' aria-label={`View details for ${job.position}`}>
          <h1 className=' text-xl capitalize mb-1 hover:text-sky-600'>{job.position}</h1>
          <h2 className=' capitalize'>{job.company}</h2>
        </button>
        <button onClick={() => onChangeFavorite(job)} className='flex ml-auto items-center'>
          {job.isFavorite ? <FaStar className="text-4xl" /> : <CiStar className="text-4xl" />}
        </button>
      </div>
      <div className='grid sm:grid-cols-2 gap-6 sm:gap-8 py-3 px-3'>
        <div className='flex items-center gap-5'>
          <FaLocationArrow className='text-slate-400' />
          <p className=' text-lg capitalize'>{job.jobLocation}</p>
        </div>
        <div className='flex items-center gap-5'>
          <FaSuitcase className='text-slate-400' />
          <p className=' text-lg capitalize'>{job.jobType}</p>
        </div>
      </div>
      <div className='grid sm:grid-cols-2 gap-6 sm:gap-8 py-3 px-3'>
        <div className='flex items-center gap-5'>
          <FaCalendarAlt className='text-slate-400' />
          <p className=' text-lg capitalize'>{formatDate(job.time)}</p>
        </div>
        <div tabIndex={0} className=" sm:hidden collapse collapse-arrow border-indigo-100 border">
          <div className="collapse-title text-xl">Description:</div>
          <div className="collapse-content">
            <p>{job.description}</p>
          </div>
        </div>
        <div className='flex items-center gap-5'>
          <p className={`${statusClass(job.status)} btn  font-medium rounded-md cursor-auto capitalize`}>{job.status}</p>
        </div>
      </div>
      <div tabIndex={0} className="hidden sm:grid collapse collapse-arrow border-indigo-100 border">
        <div className="collapse-title text-xl">Description:</div>
        <div className="collapse-content">
          <p>{job.description}</p>
        </div>
      </div>
      <div className='flex gap-5 py-3 px-3'>
        <div className='flex items-center '>
          <button onClick={() => setIsDetailsOpen(true)} className='btn capitalize bg-sky-100 text-sky-600 rounded-md hover:bg-sky-200 border-none'>details</button>
        </div>
        <div className='flex items-center '>
          <Link to={'/addJob'} state={{ job }} className='btn capitalize bg-lime-100 text-lime-600 rounded-md hover:bg-lime-200 border-none'>edit</Link>
        </div>
        <div className='flex items-center '>
          {!isDemoUser && <button onClick={() => onDeleteJob(job._id)} className='btn capitalize bg-red-100 text-red-600 shadow-lg shadow-red100/50 hover:bg-red-200 border-none'>delete</button>}
        </div>
      </div>
      <JobDetails job={job} isOpen={isDetailsOpen} onClose={() => setIsDetailsOpen(false)} isDemoUser={isDemoUser} />
    </article>
  )
}

