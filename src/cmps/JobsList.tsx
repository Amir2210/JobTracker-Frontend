import { RefObject } from 'react'
import { Job } from '../types/job.types'
import { JobsPreview } from './JobsPreview'
import { JobCardSkeleton } from './JobCardSkeleton'

export type JobView = 'grid' | 'list'

//interface
interface jobListProps {
  isLoading: boolean
  userJobs: Job[] | undefined
  lastJobRef?: RefObject<HTMLDivElement>
  isDemoUser: boolean
  view?: JobView
}


export function JobsList({ isLoading, userJobs, lastJobRef, isDemoUser, view = 'grid' }: jobListProps) {

  const gridClass = view === 'list'
    ? 'grid grid-cols-1 gap-4 mt-4'
    : 'grid sm:grid-cols-2 xl:grid-cols-3 gap-5 mt-4'

  if (isLoading) {
    return (
      <div className={gridClass}>
        {Array.from({ length: 6 }).map((_, idx) => <JobCardSkeleton key={idx} view={view} />)}
      </div>
    )
  }

  return (
    <div className={gridClass}>
      {userJobs?.map((job, index: number) => (
        <JobsPreview key={job._id} job={job} index={index} userJobs={userJobs} lastJobRef={lastJobRef} isDemoUser={isDemoUser} view={view} />
      ))}
    </div>
  )
}
