//types
import { Job } from '../types/job.types'
import { JobView } from './JobsList'
//utils
import { formatDate } from '../utils/util'
import { statusClass, statusImg, statusImgBgColor } from '../utils/status.util'
//icons
import { FaStar } from "react-icons/fa";
import { FaSuitcase } from "react-icons/fa"
import { FaCalendarAlt } from "react-icons/fa";
import { FaLocationArrow } from "react-icons/fa"
import { FaPen, FaTrash, FaRegEye } from "react-icons/fa";
import { CiStar } from "react-icons/ci";
//react
import { RefObject, useState } from 'react';
import { Link } from 'react-router-dom';
//components
import { JobDetails } from './JobDetails';
import { ConfirmDialog } from './ConfirmDialog';
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
  view?: JobView
}

async function onDeleteJob(job_id: string) {
  try {
    deleteJob(job_id)
    toast.success('Job deleted successfully')
  } catch (error) {
    console.log(error)
    toast.error('Unfortunately, we could not delete a job')
  }
}

export function JobsPreview({ job, index, userJobs, lastJobRef, isDemoUser, view = 'grid' }: JobsPreviewProps) {
  const [isFavorite, setIsFavorite] = useState(job.isFavorite)
  const [isDetailsOpen, setIsDetailsOpen] = useState(false)
  const [isConfirmOpen, setIsConfirmOpen] = useState(false)

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
  const isList = view === 'list'

  const favoriteBtn = (
    <button onClick={() => onChangeFavorite(job)} className='shrink-0 text-amber-400 hover:scale-110 transition' aria-label={job.isFavorite ? 'Remove from favorites' : 'Add to favorites'}>
      {job.isFavorite ? <FaStar className="text-2xl" /> : <CiStar className="text-2xl" />}
    </button>
  )

  const titleBlock = (
    <button onClick={() => setIsDetailsOpen(true)} className='block w-full min-w-0 text-left' aria-label={`View details for ${job.position}`}>
      <h2 className='text-lg font-semibold capitalize truncate hover:text-sky-600 transition'>{job.position}</h2>
      <p className='text-sm text-base-content/60 capitalize truncate'>{job.company}</p>
    </button>
  )

  const avatar = (
    <div className={`text-2xl text-white size-12 flex justify-center items-center rounded-xl shrink-0 ${statusImgBgColor(job.status)}`}>
      {statusImg(job.status)}
    </div>
  )

  const statusBadge = (
    <span className={`${statusClass(job.status)} btn btn-sm font-medium rounded-lg cursor-auto capitalize pointer-events-none`}>{job.status}</span>
  )

  const actions = (
    <div className='flex gap-2'>
      <button onClick={() => setIsDetailsOpen(true)} className='btn btn-sm capitalize bg-sky-100 text-sky-600 rounded-lg hover:bg-sky-200 border-none gap-1.5'><FaRegEye /> details</button>
      <Link to={'/addJob'} state={{ job }} className='btn btn-sm capitalize bg-lime-100 text-lime-600 rounded-lg hover:bg-lime-200 border-none gap-1.5'><FaPen /> edit</Link>
      {!isDemoUser && <button onClick={() => setIsConfirmOpen(true)} className='btn btn-sm capitalize bg-red-100 text-red-600 rounded-lg hover:bg-red-200 border-none gap-1.5'><FaTrash /> delete</button>}
    </div>
  )

  const overlays = (
    <>
      <JobDetails job={job} isOpen={isDetailsOpen} onClose={() => setIsDetailsOpen(false)} isDemoUser={isDemoUser} />
      <ConfirmDialog
        isOpen={isConfirmOpen}
        title='Delete application'
        message={`Delete the "${job.position}" application? This cannot be undone.`}
        confirmText='Delete'
        onConfirm={() => { onDeleteJob(job._id); setIsConfirmOpen(false) }}
        onClose={() => setIsConfirmOpen(false)}
      />
    </>
  )

  if (isList) {
    return (
      <article ref={isLastJob && (userJobs && userJobs.length > 3) ? lastJobRef : null} className='group bg-base-100 rounded-xl border border-base-300 shadow-sm transition hover:shadow-md overflow-hidden'>
        <div className={`h-1 w-full ${statusImgBgColor(job.status)}`} />
        <div className='flex flex-wrap items-center gap-4 p-4'>
          {avatar}
          <div className='grow min-w-[140px]'>{titleBlock}</div>
          <div className='hidden md:flex items-center gap-2 text-sm text-base-content/60 capitalize'>
            <FaLocationArrow className='text-base-content/30' /> {job.jobLocation}
          </div>
          <div className='hidden lg:flex items-center gap-2 text-sm text-base-content/60 capitalize'>
            <FaSuitcase className='text-base-content/30' /> {job.jobType}
          </div>
          <div className='hidden lg:flex items-center gap-2 text-sm text-base-content/60'>
            <FaCalendarAlt className='text-base-content/30' /> {formatDate(job.time)}
          </div>
          {statusBadge}
          {favoriteBtn}
          <div className='w-full sm:w-auto sm:ml-auto'>{actions}</div>
        </div>
        {overlays}
      </article>
    )
  }

  return (
    <article ref={isLastJob && (userJobs && userJobs.length > 3) ? lastJobRef : null} className='group flex flex-col bg-base-100 rounded-xl border border-base-300 shadow-sm transition hover:-translate-y-1 hover:shadow-md overflow-hidden h-fit'>
      <div className={`h-1.5 w-full ${statusImgBgColor(job.status)}`} />
      <div className='p-5 flex flex-col gap-4'>
        <div className='flex items-start gap-4'>
          {avatar}
          <div className='grow min-w-0'>{titleBlock}</div>
          {favoriteBtn}
        </div>

        <div className='grid grid-cols-2 gap-3 text-sm'>
          <div className='flex items-center gap-2 text-base-content/70 capitalize'>
            <FaLocationArrow className='text-base-content/30 shrink-0' /> <span className='truncate'>{job.jobLocation}</span>
          </div>
          <div className='flex items-center gap-2 text-base-content/70 capitalize'>
            <FaSuitcase className='text-base-content/30 shrink-0' /> <span className='truncate'>{job.jobType}</span>
          </div>
          <div className='flex items-center gap-2 text-base-content/70'>
            <FaCalendarAlt className='text-base-content/30 shrink-0' /> <span className='truncate'>{formatDate(job.time)}</span>
          </div>
          <div className='flex items-center'>{statusBadge}</div>
        </div>

        <div tabIndex={0} className="collapse collapse-arrow border border-base-300 rounded-lg">
          <div className="collapse-title font-medium">Description</div>
          <div className="collapse-content">
            <p className='text-sm text-base-content/70'>{job.description}</p>
          </div>
        </div>

        <div className='pt-1'>{actions}</div>
      </div>
      {overlays}
    </article>
  )
}
