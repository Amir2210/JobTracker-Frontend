import { Job } from '../types/job.types'
import { formatDate } from '../utils/util'
import { ensureStatusHistory, statusImg, statusImgBgColor } from '../utils/status.util'

type ActivityTimelineProps = {
  job: Job
}

export function ActivityTimeline({ job }: ActivityTimelineProps) {
  const history = [...ensureStatusHistory(job)].sort((a, b) => a.time - b.time)

  return (
    <ul className='mt-2'>
      {history.map((event, index) => {
        const isFirst = index === 0
        const isLast = index === history.length - 1
        return (
          <li key={`${event.status}-${event.time}-${index}`} className='flex gap-4'>
            <div className='flex flex-col items-center'>
              <div className={`text-white text-lg size-9 flex justify-center items-center rounded-full ${statusImgBgColor(event.status)}`}>
                {statusImg(event.status)}
              </div>
              {!isLast && <div className='w-0.5 grow bg-indigo-100 my-1' />}
            </div>
            <div className={`${isLast ? '' : 'pb-6'}`}>
              <p className='capitalize text-lg font-medium'>
                {isFirst ? 'Applied' : event.status}
                {isLast && !isFirst && <span className='ml-2 text-xs text-sky-600 normal-case'>(current)</span>}
              </p>
              {isFirst && <p className='capitalize text-sm text-slate-400'>{event.status}</p>}
              <p className='text-sm text-slate-500'>{formatDate(event.time)}</p>
            </div>
          </li>
        )
      })}
    </ul>
  )
}
