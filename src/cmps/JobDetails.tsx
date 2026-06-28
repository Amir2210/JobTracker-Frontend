import { useEffect } from 'react'
import { createPortal } from 'react-dom'
import { Job } from '../types/job.types'
import { editJob } from '../store/actions/user.actions'
import { formatDate } from '../utils/util'
import { STATUS_OPTIONS, statusClass, statusImg, statusImgBgColor } from '../utils/status.util'
import { ActivityTimeline } from './ActivityTimeline'
import { FaStar } from 'react-icons/fa'
import { CiStar } from 'react-icons/ci'
import { IoClose } from 'react-icons/io5'
import { FaSuitcase, FaLocationArrow, FaCalendarAlt } from 'react-icons/fa'

type JobDetailsProps = {
  job: Job
  isOpen: boolean
  onClose: () => void
  isDemoUser: boolean
}

export function JobDetails({ job, isOpen, onClose, isDemoUser }: JobDetailsProps) {
  useEffect(() => {
    function onKeyDown(ev: KeyboardEvent) {
      if (ev.key === 'Escape') onClose()
    }
    if (isOpen) document.addEventListener('keydown', onKeyDown)
    return () => document.removeEventListener('keydown', onKeyDown)
  }, [isOpen, onClose])

  function onChangeStatus(ev: React.ChangeEvent<HTMLSelectElement>) {
    editJob({ ...job, status: ev.target.value })
  }

  function onToggleFavorite() {
    editJob({ ...job, isFavorite: !job.isFavorite })
  }

  return createPortal(
    <div className={`fixed inset-0 z-[200] ${isOpen ? '' : 'pointer-events-none'}`} aria-hidden={!isOpen}>
      <div
        className={`absolute inset-0 bg-black/40 transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0'}`}
        onClick={onClose}
      />
      <aside
        role='dialog'
        aria-modal='true'
        aria-label={`Details for ${job.position}`}
        className={`absolute top-0 right-0 h-full w-full max-w-md bg-base-100 shadow-2xl overflow-y-auto transition-transform duration-300 ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}
      >
        <div className='flex items-start justify-between gap-4 p-5 border-b border-indigo-100'>
          <div className='flex gap-4'>
            <div className={`text-3xl text-white font-mono font-bold size-14 flex justify-center items-center rounded-lg ${statusImgBgColor(job.status)}`}>
              {statusImg(job.status)}
            </div>
            <div>
              <h2 className='text-xl capitalize font-medium'>{job.position}</h2>
              <h3 className='capitalize text-slate-500'>{job.company}</h3>
            </div>
          </div>
          <div className='flex items-center gap-2'>
            <button onClick={onToggleFavorite} aria-label='Toggle favorite'>
              {job.isFavorite ? <FaStar className='text-2xl' /> : <CiStar className='text-2xl' />}
            </button>
            <button onClick={onClose} aria-label='Close details' className='btn btn-ghost btn-circle'>
              <IoClose className='text-2xl' />
            </button>
          </div>
        </div>

        <div className='p-5 flex flex-col gap-4'>
          <div className='flex items-center gap-4'>
            <FaLocationArrow className='text-slate-400' />
            <p className='text-lg capitalize'>{job.jobLocation}</p>
          </div>
          <div className='flex items-center gap-4'>
            <FaSuitcase className='text-slate-400' />
            <p className='text-lg capitalize'>{job.jobType}</p>
          </div>
          <div className='flex items-center gap-4'>
            <FaCalendarAlt className='text-slate-400' />
            <p className='text-lg capitalize'>{formatDate(job.time)}</p>
          </div>

          <div className='flex items-center gap-4'>
            <p className={`${statusClass(job.status)} btn font-medium rounded-md cursor-auto capitalize`}>{job.status}</p>
          </div>

          {!isDemoUser && (
            <div className='flex flex-col gap-2'>
              <label htmlFor='detail-status' className='text-lg capitalize'>Change status</label>
              <select
                id='detail-status'
                value={job.status}
                onChange={onChangeStatus}
                className='select border-neutral-content focus:border-sky-600 focus:outline-none w-full max-w-xs bg-white text-gray-700 capitalize'
              >
                {STATUS_OPTIONS.map((status) => (
                  <option key={status} value={status}>{status}</option>
                ))}
              </select>
            </div>
          )}

          {job.description && (
            <div>
              <h4 className='text-lg font-medium mb-1'>Description</h4>
              <p className='text-slate-600 whitespace-pre-wrap'>{job.description}</p>
            </div>
          )}

          <div className='mt-2'>
            <h4 className='text-lg font-medium mb-3'>Activity timeline</h4>
            <ActivityTimeline job={job} />
          </div>
        </div>
      </aside>
    </div>,
    document.body
  )
}
