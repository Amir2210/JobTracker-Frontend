//types
import { Job } from '../types/job.types'
//utils
import { formatDate } from '../utils/util'
//icons
import { FaSuitcase } from "react-icons/fa"
import { FaCalendarAlt } from "react-icons/fa";
import { FaLocationArrow } from "react-icons/fa"
import { CiStar } from "react-icons/ci";
import { MdOutlinePendingActions } from "react-icons/md"
import { AiOutlineSchedule } from "react-icons/ai";
import { FaGhost } from "react-icons/fa6";
import { ImProfile } from "react-icons/im";
import { FaBug } from "react-icons/fa"
//react
import { RefObject, useState } from 'react';
import { Link } from 'react-router-dom';
//actions
import { deleteJob } from '../store/actions/user.actions';
import { toast } from 'react-toastify';
//interface
interface JobsPreviewProps {
  job: Job
  index: number
  userJobs: Job[] | undefined
  lastJobRef?: RefObject<HTMLDivElement>
}

function statusClass(status: string): string {
  if (status === 'pending') {
    return 'bg-orange-200 text-orange-600 hover:bg-orange-200 border-none'
  } else if (status === 'interview') {
    return 'bg-blue-200 text-blue-600 hover:bg-blue-200 border-none'
  } else if (status === 'HR Interview') {
    return 'bg-purple-200 text-purple-600 hover:bg-purple-200 border-none'
  } else if (status === 'Ghosting') {
    return 'bg-stone-200 text-stone-600 hover:bg-stone-200 border-none'
  }
  else {
    return 'bg-red-200 text-red-600 hover:bg-red-200 border-none'
  }
}

function statusImg(status: string): JSX.Element | undefined {
  if (status === 'pending') {
    return <MdOutlinePendingActions />
  } else if (status === 'interview') {
    return <AiOutlineSchedule />
  } else if (status === 'HR Interview') {
    return <ImProfile />
  } else if (status === 'Ghosting') {
    return <FaGhost />
  }
  else {
    return <FaBug />
  }
}

function statusImgBgColor(status: string): string {
  if (status === 'pending') {
    return 'bg-orange-400'
  } else if (status === 'interview') {
    return 'bg-blue-400'
  } else if (status === 'HR Interview') {
    return 'bg-purple-400'
  } else if (status === 'Ghosting') {
    return 'bg-stone-400'
  }
  else {
    return 'bg-red-400'
  }
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
export function JobsPreview({ job, index, userJobs, lastJobRef }: JobsPreviewProps) {
  const [isFavorite, setIsFavorite] = useState()
  return (
    <article ref={index === (userJobs?.length ?? 0) - 1 ? lastJobRef : null} key={job._id} className='sm:mt-4 sm:py-4 py-2 px-2 rounded-lg bg-base-100 h-fit'>
      <div className='flex gap-8 border-solid border-indigo-100 border-b py-3 px-3'>
        <div className={`text-4xl text-white font-mono font-bold size-14 flex justify-center items-center rounded-lg ${statusImgBgColor(job.status)}`}>{statusImg(job.status)}</div>
        <div>
          <h1 className=' text-xl capitalize mb-1'>{job.position}</h1>
          <h2 className=' capitalize'>{job.company}</h2>
        </div>
        <div className='flex ml-auto items-center'>
          <CiStar className='text-4xl' />
        </div>
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
          <p className={`${statusClass(job.status)} btn  font-medium rounded-md cursor-auto`}>{job.status}</p>
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
          <Link to={'/addJob'} state={{ job }} className='btn capitalize bg-lime-100 text-lime-600 rounded-md hover:bg-lime-200 border-none'>edit</Link>
        </div>
        <div className='flex items-center '>
          <button onClick={() => onDeleteJob(job._id)} className='btn capitalize bg-red-100 text-red-600 shadow-lg shadow-red100/50 hover:bg-red-200 border-none'>delete</button>
        </div>
      </div>
    </article>
  )
}

