import { Job, StatusEvent } from '../types/job.types'
import { MdOutlinePendingActions, MdContactPhone } from 'react-icons/md'
import { AiOutlineSchedule } from 'react-icons/ai'
import { FaBug, FaReact } from 'react-icons/fa'
import { FaGhost } from 'react-icons/fa6'
import { ImProfile } from 'react-icons/im'

export const STATUS_OPTIONS = [
  'pending',
  'interview',
  'declined',
  'HR Interview',
  'phone call',
  'code assignment',
  'Ghosting',
]

export function statusClass(status: string): string {
  if (status === 'pending') {
    return 'bg-orange-200 text-orange-600 hover:bg-orange-200 border-none'
  } else if (status === 'interview') {
    return 'bg-blue-200 text-blue-600 hover:bg-blue-200 border-none'
  } else if (status === 'HR Interview') {
    return 'bg-purple-200 text-purple-600 hover:bg-purple-200 border-none'
  } else if (status === 'Ghosting') {
    return 'bg-stone-200 text-stone-600 hover:bg-stone-200 border-none'
  } else if (status === 'phone call') {
    return 'bg-pink-200 text-pink-600 hover:bg-pink-200 border-none'
  } else if (status === 'code assignment') {
    return 'bg-emerald-200 text-emerald-600 hover:bg-emerald-200 border-none'
  } else {
    return 'bg-red-200 text-red-600 hover:bg-red-200 border-none'
  }
}

export function statusImg(status: string): JSX.Element {
  if (status === 'pending') {
    return <MdOutlinePendingActions />
  } else if (status === 'interview') {
    return <AiOutlineSchedule />
  } else if (status === 'HR Interview') {
    return <ImProfile />
  } else if (status === 'Ghosting') {
    return <FaGhost />
  } else if (status === 'phone call') {
    return <MdContactPhone />
  } else if (status === 'code assignment') {
    return <FaReact />
  } else {
    return <FaBug />
  }
}

export function statusImgBgColor(status: string): string {
  if (status === 'pending') {
    return 'bg-orange-400'
  } else if (status === 'interview') {
    return 'bg-blue-400'
  } else if (status === 'HR Interview') {
    return 'bg-purple-400'
  } else if (status === 'Ghosting') {
    return 'bg-stone-400'
  } else if (status === 'phone call') {
    return 'bg-pink-400'
  } else if (status === 'code assignment') {
    return 'bg-emerald-400'
  } else {
    return 'bg-red-400'
  }
}

export function ensureStatusHistory(job: Job): StatusEvent[] {
  if (job.statusHistory?.length) return job.statusHistory
  return [{ status: job.status, time: job.time }]
}
